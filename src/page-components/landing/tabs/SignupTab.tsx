"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

export default function SignupTab() {
  const router = useRouter();
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
  });

  const handleSignup = () => {
    // 회원가입 로직
    router.push("/"); // 회원가입 후 홈으로 리다이렉트
  };

  return (
    <TabsContent value="signup" className="space-y-4">
      <div>
        <Label htmlFor="signup-nickname">닉네임</Label>
        <Input
          id="signup-nickname"
          placeholder="닉네임을 입력하세요"
          value={signupData.nickname}
          onChange={(e) =>
            setSignupData({ ...signupData, nickname: e.target.value })
          }
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="signup-email">이메일</Label>
        <Input
          id="signup-email"
          type="email"
          placeholder="이메일을 입력하세요"
          value={signupData.email}
          onChange={(e) =>
            setSignupData({ ...signupData, email: e.target.value })
          }
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="signup-password">비밀번호</Label>
        <Input
          id="signup-password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={signupData.password}
          onChange={(e) =>
            setSignupData({ ...signupData, password: e.target.value })
          }
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="signup-confirm">비밀번호 확인</Label>
        <Input
          id="signup-confirm"
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
          value={signupData.confirmPassword}
          onChange={(e) =>
            setSignupData({
              ...signupData,
              confirmPassword: e.target.value,
            })
          }
          className="mt-1"
        />
      </div>
      <Button onClick={handleSignup} className="w-full h-12">
        회원가입
      </Button>
    </TabsContent>
  );
}
