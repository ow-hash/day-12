import * as React from "react"
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import newsData from '@/data.json';




export function CustomCarousel() {
  const aaplNews = newsData.dailyData.AAPL.news;

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {aaplNews.map((newsItem) => (
          <CarouselItem key={newsItem.id}>
            <div className="p-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-[#facc15]">{newsItem.title}</CardTitle>
                  <CardDescription><span className="font-bold">Source: </span>{newsItem.source} - {new Date(newsItem.date).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
                  <div className="relative w-full min-h-96"> 
                    <Image
                      src={newsItem.imageUrl}
                      alt={newsItem.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                  <p className="text-xl text-muted-foreground bg-[#facc15] p-5 rounded-xl">{newsItem.summary}</p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
