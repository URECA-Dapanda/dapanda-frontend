"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginTab() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleLogin = () => {
    router.push("/"); // 로그인 후 홈으로 리다이렉트
  };

  return (
    <TabsContent value="login" className="space-y-4">
      <div>
        <Label htmlFor="login-email">이메일</Label>
        <Input
          id="login-email"
          type="email"
          placeholder="이메일을 입력하세요"
          value={loginData.email}
          onChange={(e) =>
            setLoginData({ ...loginData, email: e.target.value })
          }
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="login-password">비밀번호</Label>
        <div className="relative mt-1">
          <Input
            id="login-password"
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호를 입력하세요"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
      <Button onClick={handleLogin} className="w-full h-12">
        로그인
      </Button>
    </TabsContent>
  );
}
