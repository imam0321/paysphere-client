import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, ShieldCheck, Users, Wallet, Zap } from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import TxRow from "./TxRow";
import Stat from "./Stat";
import QuickAction from "./QuickAction";


export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute -z-10 inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-fuchsia-200/50 via-white to-transparent dark:from-fuchsia-900/20" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <Badge className="rounded-full">Secure • Fast • Reliable</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight">
              Your all‑in‑one{" "}
              <span className="bg-gradient-to-r from-fuchsia-600 to-violet-600 bg-clip-text text-transparent">
                digital wallet
              </span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Send, spend, and manage money with confidence. Powerful features
              for Users, Agents, and Admins—built with modern tech.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/auth/register">
                <Button size="lg" className="rounded-2xl">
                  Create free account
                </Button>
              </Link>
              <Link to="/features">
                <Button size="lg" variant="secondary" className="rounded-2xl">
                  Explore features
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-6 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" /> Bank‑grade security
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" /> Instant transfers
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" /> 50k+ users
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="relative">
              <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-fuchsia-500/20 blur-2xl" />
              <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-violet-500/20 blur-2xl" />
              <Card className="rounded-3xl shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5" /> PaySphere Wallet
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid grid-cols-3 gap-3">
                    <Stat label="Balance" value="00.00" />
                    <Stat label="Monthly Spend" value="00.00" />
                    <Stat label="Rewards" value="00 pts" />
                  </div>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <QuickAction
                      icon={<Send className="h-4 w-4" />}
                      label="Send"
                    />
                    <QuickAction
                      icon={<Wallet className="h-4 w-4" />}
                      label="Deposit"
                    />
                    <QuickAction
                      icon={<ShieldCheck className="h-4 w-4" />}
                      label="Withdraw"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">
                      Recent transactions
                    </p>
                    <div className="grid gap-2">
                      <TxRow label="To (Send)" amount="- 00" />
                      <TxRow label="From (Deposit)" amount="+ 00" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="sr-only">
                  data for illustration.
                </CardFooter>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}