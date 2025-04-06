"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { CalendarIcon, Clock, Plus, Users } from "lucide-react";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const tHome = useTranslations("home");
  const tCommon = useTranslations("common");
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6">{tCommon("appName")}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          {tHome("heroDescription")}
        </p>
        <div className="flex justify-center gap-4 flex-col md:flex-row">
          <Button size="lg" asChild className="gap-2">
            <Link href="/timetable/create">
              <Plus className="h-5 w-5" />
              {tHome("button")}
            </Link>
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          {tHome("howItWorks")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-2">
                <CalendarIcon className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>{tHome("cardTitle1")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {tHome("cardDescription1")}
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-2">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>{tHome("cardTitle2")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {tHome("cardDescription2")}
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-2">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>{tHome("cardTitle3")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {tHome("cardDescription3")}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-muted rounded-lg p-8 text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">{tHome("readyToStart")}</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
          {tHome("ctaDescription")}
        </p>
        <Button size="lg" className="gap-2" asChild>
          <Link href="/timetable/create">
            <Plus className="h-5 w-5" />
            {tHome("button")}
          </Link>
        </Button>
      </div>
    </div>
  );
}
