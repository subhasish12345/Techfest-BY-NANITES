import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileHeader } from "@/components/dashboard/profile-header";
import { MySchedule } from "@/components/dashboard/my-schedule";
import { DashboardAnalytics } from "@/components/dashboard/analytics";
import { AiRecommendations } from "@/components/dashboard/ai-recommendations";
import { MyCertificates } from "@/components/dashboard/my-certificates";
import { MyProfile } from "@/components/dashboard/my-profile";
import { BarChart2, Bot, Calendar, Award, User } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ProfileHeader />
      <Tabs defaultValue="analytics" className="mt-8">
        <div className="relative">
             <ScrollArea>
                <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-5">
                    <TabsTrigger value="profile">
                        <User className="mr-2 h-4 w-4" />
                        My Profile
                    </TabsTrigger>
                    <TabsTrigger value="analytics">
                        <BarChart2 className="mr-2 h-4 w-4" />
                        Analytics
                    </TabsTrigger>
                    <TabsTrigger value="schedule">
                        <Calendar className="mr-2 h-4 w-4" />
                        My Schedule
                    </TabsTrigger>
                    <TabsTrigger value="ai-recommendations">
                        <Bot className="mr-2 h-4 w-4" />
                        AI Recommendations
                    </TabsTrigger>
                    <TabsTrigger value="certificates">
                        <Award className="mr-2 h-4 w-4" />
                        My Certificates
                    </TabsTrigger>
                </TabsList>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
        <TabsContent value="profile" className="mt-6">
            <MyProfile />
        </TabsContent>
        <TabsContent value="analytics" className="mt-6">
          <DashboardAnalytics />
        </TabsContent>
        <TabsContent value="schedule" className="mt-6">
          <MySchedule />
        </TabsContent>
        <TabsContent value="ai-recommendations" className="mt-6">
          <AiRecommendations />
        </TabsContent>
        <TabsContent value="certificates" className="mt-6">
            <MyCertificates />
        </TabsContent>
      </Tabs>
    </div>
  );
}
