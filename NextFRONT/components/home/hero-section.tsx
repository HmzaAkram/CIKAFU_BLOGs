import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden rounded-lg bg-muted py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Explore the Future of <span className="text-primary">AI Technology</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Stay updated with the latest advancements, trends, and insights in artificial intelligence, machine
              learning, and robotics.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/#latest-articles">Explore Articles</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/new-articles">New Articles</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-64 md:h-96">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-full w-full overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10"></div>
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0,50 Q25,30 50,50 T100,50 V100 H0 Z" className="fill-primary/10" />
                  <path d="M0,60 Q25,40 50,60 T100,60 V100 H0 Z" className="fill-primary/20" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full bg-primary/10 p-8">
                    <div className="rounded-full bg-primary/20 p-6">
                      <div className="rounded-full bg-primary p-4">
                        <span className="text-2xl font-bold text-primary-foreground">AI</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
