import React, { useRef, useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import html2canvas from 'html2canvas';

const backgroundOptions = [
  { value: "bg-black", label: "Black", textColor: "text-white" },
  { value: "bg-white", label: "White", textColor: "text-black" },
  { value: "bg-blue-500", label: "Blue", textColor: "text-white" },
  { value: "bg-red-500", label: "Red", textColor: "text-white" },
  { value: "bg-green-500", label: "Green", textColor: "text-white" },
  { value: "bg-purple-500", label: "Purple", textColor: "text-white" },
  { value: "bg-yellow-500", label: "Yellow", textColor: "text-black" },
  { value: "bg-orange-500", label: "Orange", textColor: "text-white" },
  { value: "bg-pink-500", label: "Pink", textColor: "text-white" },
  { value: "bg-gray-500", label: "Gray", textColor: "text-white" },
];

export default function Home() {
  const [name, setName] = useState("John Doe");
  const [username, setUsername] = useState("johndoe");
  const [avatar, setAvatar] = useState("https://api.dicebear.com/7.x/avataaars/svg?seed=John");
  const [tweet, setTweet] = useState("This is my awesome tweet!");
  const [likes, setLikes] = useState("1,234");
  const [retweets, setRetweets] = useState("123");
  const [replies, setReplies] = useState("45");
  const [views, setViews] = useState("12.5K");
  const [background, setBackground] = useState(backgroundOptions[0]);
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(400);
  
  const tweetRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const downloadScreenshot = async () => {
    if (tweetRef.current) {
      const canvas = await html2canvas(tweetRef.current);
      const link = document.createElement('a');
      link.download = 'tweet-screenshot.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const handleBackgroundChange = (value: string) => {
    const selectedBg = backgroundOptions.find(bg => bg.value === value);
    if (selectedBg) {
      setBackground(selectedBg);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <Head>
        <title>Tweet Screenshot Generator</title>
        <meta name="description" content="Generate Twitter post screenshots" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-background min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto p-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle>Tweet Settings</CardTitle>
                <CardDescription>Customize your tweet screenshot</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="background">Background Color</Label>
                  <Select
                    value={background.value}
                    onValueChange={handleBackgroundChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select background color" />
                    </SelectTrigger>
                    <SelectContent>
                      {backgroundOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded ${option.value}`}></div>
                            {option.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Screenshot Size</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="width">Width (px)</Label>
                      <Input
                        id="width"
                        type="number"
                        value={width}
                        onChange={(e) => setWidth(Number(e.target.value))}
                        min={200}
                        max={1200}
                      />
                    </div>
                    <div>
                      <Label htmlFor="height">Height (px)</Label>
                      <Input
                        id="height"
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(Number(e.target.value))}
                        min={200}
                        max={1200}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Display Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Display Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="username"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Avatar Image</Label>
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={avatar} alt={name} />
                      <AvatarFallback>{name[0]}</AvatarFallback>
                    </Avatar>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <Button onClick={triggerFileInput} variant="outline">
                      Upload Image
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tweet">Tweet Content</Label>
                  <Textarea
                    id="tweet"
                    value={tweet}
                    onChange={(e) => setTweet(e.target.value)}
                    placeholder="What's happening?"
                    className="h-24"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="likes">Likes</Label>
                    <Input
                      id="likes"
                      value={likes}
                      onChange={(e) => setLikes(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="retweets">Retweets</Label>
                    <Input
                      id="retweets"
                      value={retweets}
                      onChange={(e) => setRetweets(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="replies">Replies</Label>
                    <Input
                      id="replies"
                      value={replies}
                      onChange={(e) => setReplies(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="views">Views</Label>
                    <Input
                      id="views"
                      value={views}
                      onChange={(e) => setViews(e.target.value)}
                    />
                  </div>
                </div>
                <Button onClick={downloadScreenshot} className="w-full">
                  Download Screenshot
                </Button>
              </CardContent>
            </Card>

            {/* Preview Section */}
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>This is how your tweet will look</CardDescription>
              </CardHeader>
              <CardContent>
                <div 
                  className="overflow-auto"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '600px'
                  }}
                >
                  <div 
                    ref={tweetRef} 
                    className={`${background.value} p-4 rounded-lg`}
                    style={{
                      width: `${width}px`,
                      height: `${height}px`,
                      minWidth: '200px',
                      minHeight: '200px'
                    }}
                  >
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={avatar} alt={name} />
                        <AvatarFallback>{name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-1">
                          <span className={`font-bold ${background.textColor}`}>{name}</span>
                          <span className="text-gray-500">@{username}</span>
                        </div>
                        <p className={`${background.textColor} whitespace-pre-wrap`}>{tweet}</p>
                        <div className="flex justify-between text-gray-500 text-sm pt-4">
                          <span>{replies} replies</span>
                          <span>{retweets} retweets</span>
                          <span>{likes} likes</span>
                          <span>{views} views</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}