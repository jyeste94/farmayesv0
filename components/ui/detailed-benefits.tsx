"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Truck,
  RotateCcw,
  HeadphonesIcon,
  Clock,
  MapPin,
  Calendar,
  Phone,
  Mail,
  MessageCircle,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  HelpCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

interface DetailedBenefitsProps {
  activeTab?: "shipping" | "returns" | "support"
  className?: string
}

export function DetailedBenefits({ activeTab = "shipping", className = "" }: DetailedBenefitsProps) {
  const [currentTab, setCurrentTab] = useState<string>(activeTab)

  const shippingOptions = [
    {
      id: "standard",
      name: "Standard Shipping",
      price: "FREE",
      condition: "Orders over $50",
      time: "3-5 business days",
      description:
        "Our standard shipping option is free for all orders over $50. For orders under $50, a flat rate of $5.99 applies.",
      icon: <Truck className="w-5 h-5" />,
      recommended: false,
    },
    {
      id: "express",
      name: "Express Shipping",
      price: "$9.99",
      condition: "All orders",
      time: "1-2 business days",
      description:
        "Get your order faster with our express shipping option. Available for all orders regardless of total amount.",
      icon: <Clock className="w-5 h-5" />,
      recommended: true,
    },
    {
      id: "same-day",
      name: "Same-Day Delivery",
      price: "$14.99",
      condition: "Select metro areas",
      time: "Same day (order by 2 PM)",
      description:
        "Available in select metropolitan areas. Order by 2 PM local time to receive your order the same day.",
      icon: <MapPin className="w-5 h-5" />,
      recommended: false,
    },
  ]

  const returnSteps = [
    {
      title: "Initiate Return",
      description:
        "Log in to your account, find your order, and select 'Return Items'. Alternatively, contact our customer service team.",
      icon: <HelpCircle className="w-6 h-6" />,
    },
    {
      title: "Package Items",
      description: "Place the items in their original packaging if possible. Include the return form or order number.",
      icon: <CheckCircle className="w-6 h-6" />,
    },
    {
      title: "Ship Return",
      description:
        "Use our prepaid return label or ship to our returns center. Track your return using the provided tracking number.",
      icon: <Truck className="w-6 h-6" />,
    },
    {
      title: "Receive Refund",
      description:
        "Once we receive and process your return, your refund will be issued to your original payment method within 5-7 business days.",
      icon: <CheckCircle className="w-6 h-6" />,
    },
  ]

  const supportFaqs = [
    {
      question: "How can I track my order?",
      answer:
        "You can track your order by logging into your account and viewing your order history. You'll also receive tracking information via email once your order ships.",
    },
    {
      question: "How do I upload my prescription?",
      answer:
        "You can upload your prescription during checkout or through your account dashboard. We accept images and PDF files. Our pharmacists will verify your prescription before shipping.",
    },
    {
      question: "Can I speak with a pharmacist?",
      answer:
        "Yes, our licensed pharmacists are available 24/7 for consultation. You can reach them via phone, email, or live chat through our website or mobile app.",
    },
    {
      question: "What if my medication is out of stock?",
      answer:
        "If a medication is out of stock, we'll notify you immediately and provide alternatives if available. For prescription medications, our pharmacists will work with you to find suitable solutions.",
    },
    {
      question: "Do you offer automatic refills?",
      answer:
        "Yes, we offer an automatic refill program for prescription medications. You can set up this service through your account or by contacting customer support.",
    },
  ]

  return (
    <div className={cn("py-8 md:py-12", className)}>
      <div className="container mx-auto px-4">
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-3 w-full max-w-2xl">
              <TabsTrigger value="shipping" className="flex items-center gap-2">
                <Truck className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">Shipping</span>
              </TabsTrigger>
              <TabsTrigger value="returns" className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">Returns</span>
              </TabsTrigger>
              <TabsTrigger value="support" className="flex items-center gap-2">
                <HeadphonesIcon className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">Support</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Shipping Tab Content */}
          <TabsContent value="shipping" className="mt-0">
            <div className="bg-gray-50 rounded-lg p-6 md:p-8">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold font-montserrat text-charcoal mb-3">
                    Shipping Options
                  </h2>
                  <p className="text-gray-600 font-inter">
                    We offer multiple shipping options to meet your needs. All orders are processed within 24 hours.
                  </p>
                </div>

                {/* Shipping Options */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {shippingOptions.map((option) => (
                    <Card
                      key={option.id}
                      className={cn(
                        "border overflow-hidden transition-all hover:shadow-md",
                        option.recommended && "border-primary-blue shadow-sm",
                      )}
                    >
                      {option.recommended && (
                        <div className="bg-primary-blue text-white text-center py-1 text-xs font-medium">
                          RECOMMENDED
                        </div>
                      )}
                      <CardContent className={cn("p-6", option.recommended && "pt-5")}>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 text-blue-600 rounded-full">{option.icon}</div>
                            <h3 className="font-semibold font-montserrat">{option.name}</h3>
                          </div>
                          <div className="text-lg font-bold text-primary-blue">{option.price}</div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Eligibility:</span>
                            <span className="font-medium">{option.condition}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Delivery Time:</span>
                            <span className="font-medium">{option.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 pt-2">{option.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Shipping Map */}
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="text-xl font-montserrat">Delivery Coverage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gray-200 rounded-md flex items-center justify-center mb-4">
                      <div className="text-gray-500">Delivery Coverage Map</div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Same-day delivery is available in highlighted areas. Enter your zip code during checkout to see
                      available delivery options for your location.
                    </p>
                  </CardContent>
                </Card>

                {/* Shipping FAQs */}
                <div>
                  <h3 className="text-xl font-semibold font-montserrat mb-4">Frequently Asked Questions</h3>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>How do I track my order?</AccordionTrigger>
                      <AccordionContent>
                        You can track your order by logging into your account and viewing your order history. You'll
                        also receive tracking information via email once your order ships.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>What if I'm not home for delivery?</AccordionTrigger>
                      <AccordionContent>
                        For standard and express shipping, the carrier will leave your package if it's safe to do so or
                        attempt delivery again. For same-day delivery, you can provide delivery instructions during
                        checkout.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
                      <AccordionContent>
                        Currently, we only ship within the United States. International shipping options are coming
                        soon.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                <div className="mt-8 text-center">
                  <Button asChild>
                    <Link href="/shipping-policy">
                      View Complete Shipping Policy
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Returns Tab Content */}
          <TabsContent value="returns" className="mt-0">
            <div className="bg-gray-50 rounded-lg p-6 md:p-8">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold font-montserrat text-charcoal mb-3">
                    Easy Returns & Refunds
                  </h2>
                  <p className="text-gray-600 font-inter">
                    We stand behind our products with a hassle-free 30-day return policy.
                  </p>
                </div>

                {/* Return Policy Highlights */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-green-100 text-green-600 rounded-full">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold font-montserrat">30-Day Returns</h3>
                      </div>
                      <p className="text-sm text-gray-600">
                        Return any unused item within 30 days of delivery for a full refund of the purchase price.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
                          <Truck className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold font-montserrat">Free Return Shipping</h3>
                      </div>
                      <p className="text-sm text-gray-600">
                        We provide prepaid return labels for all eligible returns at no additional cost to you.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-purple-100 text-purple-600 rounded-full">
                          <CheckCircle className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold font-montserrat">Fast Refunds</h3>
                      </div>
                      <p className="text-sm text-gray-600">
                        Refunds are processed within 1-2 business days of receiving your return, with funds typically
                        appearing in 5-7 days.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Return Process Steps */}
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="text-xl font-montserrat">Return Process</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      {/* Progress Line */}
                      <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-200"></div>
                      <div className="space-y-8">
                        {returnSteps.map((step, index) => (
                          <div key={index} className="flex items-start gap-4 relative">
                            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 z-10">
                              {step.icon}
                            </div>
                            <div className="pt-2">
                              <h4 className="font-semibold font-montserrat mb-1">
                                Step {index + 1}: {step.title}
                              </h4>
                              <p className="text-sm text-gray-600">{step.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Return Eligibility */}
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="text-xl font-montserrat">Return Eligibility</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium mb-1">Eligible for Return</h4>
                          <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                            <li>Unopened over-the-counter medications</li>
                            <li>Unopened beauty and personal care products</li>
                            <li>Unopened vitamins and supplements</li>
                            <li>Medical devices in original packaging</li>
                          </ul>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium mb-1">Not Eligible for Return</h4>
                          <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                            <li>Prescription medications (by law)</li>
                            <li>Opened or used products</li>
                            <li>Products without original packaging</li>
                            <li>Clearance or final sale items</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="mt-8 text-center">
                  <Button asChild>
                    <Link href="/return-policy">
                      View Complete Return Policy
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Support Tab Content */}
          <TabsContent value="support" className="mt-0">
            <div className="bg-gray-50 rounded-lg p-6 md:p-8">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold font-montserrat text-charcoal mb-3">
                    Customer Support
                  </h2>
                  <p className="text-gray-600 font-inter">
                    Our team of experts is available 24/7 to assist you with any questions or concerns.
                  </p>
                </div>

                {/* Contact Methods */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
                          <Phone className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold font-montserrat">Phone Support</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Call us anytime, day or night. Our team is available 24/7 to assist you.
                      </p>
                      <div className="text-lg font-bold text-primary-blue">1-800-PHARMA-CARE</div>
                      <div className="text-xs text-gray-500 mt-1">Available 24/7</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-green-100 text-green-600 rounded-full">
                          <Mail className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold font-montserrat">Email Support</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Send us an email for non-urgent inquiries. We respond within 24 hours.
                      </p>
                      <div className="text-primary-blue font-medium break-all">support@pharmacare.com</div>
                      <div className="text-xs text-gray-500 mt-1">Response within 24 hours</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-purple-100 text-purple-600 rounded-full">
                          <MessageCircle className="w-5 h-5" />
                        </div>
                        <h3 className="font-semibold font-montserrat">Live Chat</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Chat with our pharmacists and support team directly from our website or mobile app.
                      </p>
                      <Button size="sm" className="w-full">
                        Start Chat
                      </Button>
                      <div className="text-xs text-gray-500 mt-1">Available 24/7</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Support Team */}
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="text-xl font-montserrat">Our Support Team</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-3"></div>
                        <h4 className="font-semibold font-montserrat">Licensed Pharmacists</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Our team of licensed pharmacists can answer medication questions and provide consultation.
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-3"></div>
                        <h4 className="font-semibold font-montserrat">Customer Service</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Our customer service team handles orders, returns, and general inquiries.
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-3"></div>
                        <h4 className="font-semibold font-montserrat">Technical Support</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Our tech team assists with website, app, and account-related issues.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* FAQs */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold font-montserrat mb-4">Frequently Asked Questions</h3>
                  <Accordion type="single" collapsible className="w-full">
                    {supportFaqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>

                <div className="mt-8 text-center">
                  <Button asChild>
                    <Link href="/contact">
                      Contact Our Support Team
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
