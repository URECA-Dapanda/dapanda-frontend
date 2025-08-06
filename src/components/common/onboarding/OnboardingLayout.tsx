import React from "react";
import { ButtonComponent } from "../button/ButtonComponent";
import { cn } from "@/lib/utils";
import Image from "next/image";

export interface OnboardingPage {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

interface OnboardingLayoutProps {
  pages: OnboardingPage[];
  currentPage: number;
  onNext: () => void;
  onPrevious: () => void;
  onComplete?: () => void;
  className?: string;
  isLoading?: boolean;
}

export function OnboardingLayout({
  pages,
  currentPage,
  onNext,
  onPrevious,
  onComplete,
  className,
  isLoading = false,
}: OnboardingLayoutProps) {
  const isLastPage = currentPage === pages.length - 1;
  const currentPageData = pages[currentPage];

  return (
    <div
      className={cn(
        "flex flex-col w-full h-full bg-white px-24 py-60 lg:w-[600px] mx-auto",
        className
      )}
    >
      <div className="flex justify-center items-center p-8">
        <div className="flex space-x-2">
          {pages.map((_, index) => (
            <div
              key={index}
              className={cn(
                "w-8 h-8 rounded-full transition-all duration-300",
                index === currentPage ? "bg-primary w-12" : "bg-gray-300"
              )}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center pt-32 gap-24">
        <h1 className="text-lg font-bold text-center text-gray-900 whitespace-pre-line">
          {currentPageData.title}
        </h1>

        <p className="text-sm text-center text-gray-600 leading-relaxed whitespace-pre-line">
          {currentPageData.description}
        </p>

        <div className="items-center justify-center w-full flex flex-col pt-16">
          <Image
            src={currentPageData.image}
            alt={currentPageData.imageAlt}
            width={350}
            height={450}
            priority
            className="w-full h-auto object-contain max-h-[36vh]"
          />
        </div>
      </div>

      <div className="flex justify-between items-center px-24">
        <ButtonComponent
          variant="nonoutline"
          size="lg"
          onClick={onPrevious}
          disabled={currentPage === 0 || isLoading}
          className="px-20"
        >
          이전
        </ButtonComponent>

        <ButtonComponent
          variant="floatingPrimary"
          size="lg"
          onClick={isLastPage ? onComplete : onNext}
          disabled={isLoading}
          className="px-20"
        >
          {isLoading ? "처리중..." : isLastPage ? "시작하기" : "다음"}
        </ButtonComponent>
      </div>
    </div>
  );
}
