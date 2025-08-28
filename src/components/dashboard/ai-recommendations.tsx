
"use client";

import { useState, useEffect } from "react";
import { recommendEventCategories } from "@/ai/flows/recommend-event-categories";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Bot, Lightbulb, Loader2 } from "lucide-react";
import { eventCategoriesList } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";

export function AiRecommendations() {
  const { userData } = useAuth();
  const [userProfile, setUserProfile] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(eventCategoriesList);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (userData?.profile) {
      setUserProfile(userData.profile);
    } else {
        setUserProfile("I am a student interested in technology, programming, and design.");
    }
  }, [userData]);


  const handleCheckboxChange = (category: string, checked: boolean | "indeterminate") => {
    if (checked) {
      setSelectedCategories((prev) => [...prev, category]);
    } else {
      setSelectedCategories((prev) => prev.filter((c) => c !== category));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setRecommendations([]);

    try {
      const result = await recommendEventCategories({
        userProfile,
        eventCategories: selectedCategories,
      });
      setRecommendations(result.recommendedCategories);
    } catch (error) {
      console.error("AI Recommendation Error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get AI recommendations. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-card border-primary/20">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" /> AI Event Recommendations
          </CardTitle>
          <CardDescription>
            Describe your interests and let our AI suggest the best event categories for you. You can update your profile in your account settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="user-profile" className="text-base">Your Profile & Interests</Label>
            <Textarea
              id="user-profile"
              placeholder="e.g., I'm a frontend developer who loves React and creative coding..."
              value={userProfile}
              onChange={(e) => setUserProfile(e.target.value)}
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-base">Available Event Categories</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {eventCategoriesList.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={(checked) => handleCheckboxChange(category, checked)}
                  />
                  <Label htmlFor={category} className="font-normal">{category}</Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Get Recommendations"
            )}
          </Button>

          {recommendations.length > 0 && (
            <div className="w-full">
              <h3 className="font-headline text-lg text-primary flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Recommended For You:
                </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {recommendations.map((rec) => (
                  <span key={rec} className="px-3 py-1 text-sm font-medium rounded-full bg-accent text-accent-foreground">
                    {rec}
                  </span>
                ))}
              </div>
            </div>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
