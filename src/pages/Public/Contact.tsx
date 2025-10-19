import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";


export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
 <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
  <h1 className="text-4xl font-bold text-foreground mb-6 text-center">
    Contact Us
  </h1>
  <p className="text-center text-muted-foreground mb-12">
    Have a question or need support? Send us a message and we’ll get back to you shortly.
  </p>

  <div className="bg-card shadow-md rounded-xl p-8 sm:p-12">
    {submitted ? (
      <div className="text-center text-success font-semibold text-lg">
        Thank you! Your message has been sent.
      </div>
    ) : (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Write your message here..."
            value={form.message}
            onChange={handleChange}
            rows={5}
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Send Message
        </Button>
      </form>
    )}
  </div>

  <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8 text-foreground">
    <div className="flex flex-col space-y-2">
      <h3 className="font-semibold text-lg">Email</h3>
      <p>support@parcelapp.com</p>
    </div>
    <div className="flex flex-col space-y-2">
      <h3 className="font-semibold text-lg">Phone</h3>
      <p>+880 1234 567890</p>
    </div>
    <div className="flex flex-col space-y-2">
      <h3 className="font-semibold text-lg">Address</h3>
      <p>123 Parcel Street, Dhaka, Bangladesh</p>
    </div>
    <div className="flex flex-col space-y-2">
      <h3 className="font-semibold text-lg">Working Hours</h3>
      <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
    </div>
  </div>
</div>

  );
}
