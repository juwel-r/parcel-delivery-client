import { motion } from "framer-motion";
import { Truck, ShieldCheck, Users, Globe2 } from "lucide-react";
import { Link } from "react-router";
import parcelPhoto from './../../assets/images/parcecl.png';

const About = () => {
  return (
    <div className="min-h-screen  text-muted-foreground">
      {/* --- Hero Section --- */}
      <section className="text-center py-16 px-6 md:px-12">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4 text-primary"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Parcel Delivery System
        </motion.h1>
        <motion.p
          className="text-lg text-gray-600 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Empowering secure, transparent, and lightning-fast delivery
          experiences across Bangladesh. Whether you’re a sender, receiver, or
          admin, we make parcel management effortless.
        </motion.p>
      </section>

      {/* --- Mission Section --- */}
      <section className="py-12 px-6 md:px-12 ">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.img
            src={parcelPhoto}
            alt="Parcel delivery"
            className="rounded-2xl shadow-sm w-full object-cover h-80 my-3"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          />
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-semibold mb-4 text-primary">
              Our Mission
            </h2>
            <p className="text-gray-600 mb-3 leading-relaxed">
              We aim to simplify parcel logistics with technology-driven
              solutions. From booking to doorstep delivery, we focus on
              reliability, speed, and customer satisfaction.
            </p>
            <p className="text-gray-600 leading-relaxed">
              By bridging the gap between senders and receivers, we’re
              transforming courier services into a seamless, data-backed
              experience — ensuring trust, transparency, and timely delivery
              every time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- Core Values Section --- */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-bold text-primary mb-2">
            Our Core Values
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything we do revolves around building trust and delivering
            excellence to our customers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <Truck className="w-10 h-10 text-primary mx-auto mb-4" />,
              title: "Speed",
              desc: "We ensure swift delivery, minimizing delays and maximizing satisfaction.",
            },
            {
              icon: (
                <ShieldCheck className="w-10 h-10 text-primary mx-auto mb-4" />
              ),
              title: "Security",
              desc: "Your parcels are protected and handled with utmost care at every step.",
            },
            {
              icon: <Users className="w-10 h-10 text-primary mx-auto mb-4" />,
              title: "Transparency",
              desc: "Real-time tracking keeps you informed from dispatch to delivery.",
            },
            {
              icon: <Globe2 className="w-10 h-10 text-primary mx-auto mb-4" />,
              title: "Accessibility",
              desc: "Our platform is designed for everyone — easy, inclusive, and available 24/7.",
            },
          ].map((value, index) => (
            <motion.div
              key={index}
              className=" rounded-2xl shadow-md p-6 hover:shadow-lg transition"
              whileHover={{ scale: 1.05 }}
            >
              {value.icon}
              <h3 className="text-xl font-semibold mb-2 text-muted-foreground">
                {value.title}
              </h3>
              <p className="text-gray-600 text-sm">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- Vision Section --- */}
      <section className="py-16 px-6 md:px-12 ">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">Our Vision</h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            To be Bangladesh’s most trusted digital logistics partner — enabling
            every parcel, every journey, and every connection to deliver
            happiness faster than ever before.
          </p>
        </div>
      </section>

      {/* --- Footer CTA --- */}
      <footer className="py-12 bg-primary/80 dark:bg-primary/40 text-white text-center">
        <h3 className="text-2xl font-semibold mb-3">
          Join the Delivery Revolution 🚀
        </h3>
        <p className="mb-6 px-4">
          Experience hassle-free deliveries with real-time tracking and
          transparent pricing.
        </p>
        <Link to={"/registration"}>
        
          <button className=" text-primary bg-white font-semibold px-6 py-3 rounded-full hover:bg-blue-100 transition">
            Get Started
          </button>
        </Link>
      </footer>
    </div>
  );
};

export default About;
