// Import component dependencies
// AppSidebar: The main sidebar component for the application
import { AppSidebar } from "./components/app-sidebar";
// Navbar: The top navigation bar component
import Navbar from "./components/navbar";
// RewardsTab: The rewards section/component of the application
import RewardsTab from "./components/rewards/rewards";
// SidebarProvider: Context provider for sidebar state management
import { SidebarProvider } from "./components/ui/sidebar";
// Block the app when NOT authenticated
import { useAuth } from "@/context/auth-context";
import Auth from "@/components/auth/auth";
import { ScreenLoader } from "./components/ui/loader";
import { useEffect, useState } from "react";



// Main App component - serves as the root layout/wrapper for the application
// Accepts children prop which allows this component to wrap other content/pages
function App({ children }: { children: React.ReactNode; }) {
	const { user, loading } = useAuth();

	// const [loading, setLoading] = useState(true);
	const [showLoader, setShowLoader] = useState(false);

	useEffect(() => {
		if (loading) {
			const timer = setTimeout(() => {
				setShowLoader(true);
			}, 3000); // 3-second delay
			return () => clearTimeout(timer);
		}
	}, [loading]);

	if (loading && showLoader) {
		return <ScreenLoader show />;
	}


	if (!user) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<Auth />
			</div>
		);
	}

	return (
		// Wrap the entire application in SidebarProvider
		// This provides sidebar state (open/closed, etc.) to all child components
		<SidebarProvider>
			{/* 
				Main container div with:
				- flex display for horizontal layout
				- bg-sidebar background color (likely a custom Tailwind color)
				- min-h-screen to ensure it takes at least full viewport height
				- w-full to take full width
			*/}
			<div className="flex bg-sidebar min-h-screen w-full">
				{/* Sidebar Component */}
				{/* 
					Renders the application sidebar on the left side
					This component likely contains navigation links, menu items, etc.
				*/}
				<AppSidebar />

				{/* Main content area - takes up remaining space after sidebar */}
				<div className="flex flex-col w-full">
					{/* Top navigation bar */}
					{/* 
						Fixed navigation bar at the top of the main content area
						Typically contains user profile, notifications, search, etc.
					*/}
					<Navbar />

					{/* 
						Main content container
						- flex-col: stacks children vertically
						- w-full: takes full available width
					*/}
					<main className="flex flex-col w-full">
						{/* 
							RewardsTab component
							- Displays rewards/points/achievements section
							- Rendered before the dynamic children content
						*/}
						<RewardsTab />

						{/* 
							Dynamic children content
							- This is where page-specific content will be rendered
							- Could be different components based on routing
							- Makes this App component reusable as a layout wrapper
						*/}
						{children}
					</main>
				</div>
			</div>
		</SidebarProvider>
	);
}

// Export the App component as the default export
// This allows it to be imported without curly braces in other files
export default App;
