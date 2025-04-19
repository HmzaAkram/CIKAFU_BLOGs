import Link from "next/link"
import { Github, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight">CIKAFU</span>
              <span className="rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">BLOGs</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted source for the latest AI technology articles, insights, and trends.
            </p>
            <div className="flex space-x-4">
              <Link href="https://twitter.com" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://github.com" className="text-muted-foreground hover:text-primary">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://linkedin.com" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/new-articles" className="text-muted-foreground hover:text-primary">
                  New Articles
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-muted-foreground hover:text-primary">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/?category=ai" className="text-muted-foreground hover:text-primary">
                  Artificial Intelligence
                </Link>
              </li>
              <li>
                <Link href="/?category=ml" className="text-muted-foreground hover:text-primary">
                  Machine Learning
                </Link>
              </li>
              <li>
                <Link href="/?category=robotics" className="text-muted-foreground hover:text-primary">
                  Robotics
                </Link>
              </li>
              <li>
                <Link href="/?category=nlp" className="text-muted-foreground hover:text-primary">
                  Natural Language Processing
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Contact</h3>
            <address className="not-italic">
              <p className="text-sm text-muted-foreground">
                Email:{" "}
                <a href="mailto:info@cikafu.com" className="hover:text-primary">
                  info@cikafu.com
                </a>
              </p>
              <p className="text-sm text-muted-foreground">
                Phone:{" "}
                <a href="tel:+1234567890" className="hover:text-primary">
                  +1 (234) 567-890
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} CIKAFU BLOGs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
