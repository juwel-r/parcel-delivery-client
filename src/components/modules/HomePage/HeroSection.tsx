import { Button } from "@/components/ui/button";
import { useUserInfoQuery } from "@/redux/features/auth/authApi";
import { Link } from "react-router";

const LandingPage = () => {
  const { data: user } = useUserInfoQuery(); // { role, name, email } or null if not logged in

  const renderHeroText = () => {
    if (!user) {
      return (
        <>
          <h1 className="text-4xl font-bold text-center mb-3">
            Fast, Reliable & Secure Parcel Delivery 🚚
          </h1>
          <p className="text-muted-foreground text-center mb-6 max-w-xl mx-auto">
            Deliver documents and packages anywhere in Bangladesh with ease.
            Track parcels in real-time and enjoy transparent pricing.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/login">
              <Button>Login</Button>
            </Link>
            <Link to="/registration">
              <Button variant="outline">Get Started</Button>
            </Link>
          </div>
        </>
      );
    }

    switch (user.role) {
      case "SENDER":
        return (
          <>
            <h1 className="text-3xl font-semibold text-center mb-2">
              Welcome back, {user.name}! ✉️
            </h1>
            <p className="text-center text-muted-foreground mb-6">
              Create a new delivery request or track your parcels easily.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link className="mx-auto" to="/sender/create-parcel">
                <Button>Create Parcel</Button>
              </Link>
              <Link className="mx-auto" to="/sender/my-parcels">
                <Button variant="outline">View My Parcels</Button>
              </Link>
            </div>
          </>
        );

      case "RECEIVER":
        return (
          <>
            <h1 className="text-3xl font-semibold text-center mb-2">
              Hello, {user.name}! 📦
            </h1>
            <p className="text-center text-muted-foreground mb-6">
              View and confirm deliveries or check your delivery history.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link className="mx-auto" to="/receiver/incoming-parcel">
                <Button>View Received Parcels</Button>
              </Link>
              <Link className="mx-auto" to="/receiver/delivery-history">
                <Button className="" variant="outline">Delivery History</Button>
              </Link>
            </div>
          </>
        );

      case "ADMIN":
        return (
          <>
            <h1 className="text-3xl font-semibold text-center mb-2">
              Welcome, Admin {user.name}! 🛠️
            </h1>
            <p className="text-center text-muted-foreground mb-6">
              Manage users, monitor parcels, and ensure smooth operations.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link className="mx-auto" to="/dashboard/users">
                <Button>Manage Users</Button>
              </Link>
              <Link className="mx-auto" to="/dashboard/parcels">
                <Button variant="outline">View All Parcels</Button>
              </Link>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden ">
      {renderHeroText()}

      <div className="mt-16 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "📦 Real-Time Tracking",
            desc: "Stay updated with live parcel status anytime, anywhere.",
          },
          {
            title: "🛡️ Secure Handling",
            desc: "Your packages are safe with verified senders and receivers.",
          },
          {
            title: "⚡ Fast Delivery",
            desc: "Experience quick delivery times across Bangladesh.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className=" shadow-md p-6 rounded-2xl text-center hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
