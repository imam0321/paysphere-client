import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import Logo from "@/assets/icons/Logo";
import RegisterForm from "@/components/modules/Authentication/RegisterForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation, useNavigate } from "react-router";

export default function RegisterPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentTab = location.pathname.includes("/agent") ? "agent" : "user";

  const handleTabChange = (value: string) => {
    if (value === "user" || value === "agent") {
      const currentPath = `/${value}/register`;
      if (location.pathname !== currentPath) {
        navigate(currentPath);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary/10 to-primary/20 px-4 relative">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-4 left-6"
      >
        <Logo />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-96"
      >
        <Card className="rounded-2xl shadow-xl border border-primary/20">
          <CardHeader className="text-center  py-0">
            <CardTitle className="text-2xl font-bold text-primary">
              Create Account ✨
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs
              value={currentTab}
              onValueChange={handleTabChange}
              className="w-full"
            >
              <TabsList className="grid w-full border grid-cols-2 mb-2">
                <TabsTrigger value="user">User</TabsTrigger>
                <TabsTrigger value="agent">Agent</TabsTrigger>
              </TabsList>

              <TabsContent value="user">
                <RegisterForm userType="user" />
              </TabsContent>

              <TabsContent value="agent">
                <RegisterForm userType="agent" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
