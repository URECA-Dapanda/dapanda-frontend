"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserDropdownMenu } from "@/components/common/dropdown/UserDropdownMenu";
import { chatMenuOptions, dataSortOptions } from "@/components/common/dropdown/dropdownConfig";
import LandingPageContent from "@feature/home/components/LandingPageContent";

export default function Home() {
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("정렬");

  const handleReport = () => {
    setReportModalOpen(true);
  };

  return <LandingPageContent />;
}
