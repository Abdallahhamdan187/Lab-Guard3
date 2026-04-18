import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { setUserSession } from "@/utils/auth";

export function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        let userRole = "Admin"; // Default role
        if (email.includes("admin")) userRole = "admin";
        else if (email.includes("instructor")) userRole = "instructor";
        else if (email.includes("assistant")) userRole = "lab-assistant";

        const userPayload = {
            name: email.split('@')[0].replace('.', ' '),
            email: email,
            role: userRole,
            imageUrl: "https://github.com/shadcn.png"
        };


        setUserSession(userPayload);

        if (userRole === "admin") navigate("/admin");
        else if (userRole === "instructor") navigate("/instructor");
        else if (userRole === "lab-assistant") navigate("/lab-assistant");
        else navigate("/");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] p-4">
            <Card className="w-full max-w-md shadow-lg border-border">
                <CardHeader className="text-center space-y-4 pb-8">
                    <div className="flex justify-center">
                        <div className="p-4 bg-[#e9333f] rounded-2xl shadow-sm">
                            <Package className="w-10 h-10 text-white" strokeWidth={2} />
                        </div>
                    </div>
                    <div>
                        <CardTitle className="text-3xl font-bold text-gray-900">LabGuard</CardTitle>
                        <CardDescription className="text-base mt-2 text-gray-600">
                            Laboratory Inventory Management System
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="your.name@htu.edu.jo"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 border-border focus-visible:ring-[#e9333f]"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-gray-700">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 border-border focus-visible:ring-[#e9333f]"
                                    required
                                />
                            </div>
                        </div>



                        <Button
                            type="submit"
                            className="w-full bg-[#e9333f] hover:bg-[#d12233] text-white py-6 text-base font-medium"
                        >
                            Sign In to LabGuard
                        </Button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-border text-center text-sm text-gray-500">
                        <p>Need access? Contact your lab administrator</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}