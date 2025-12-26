import { AppSidebar } from "./components/app-sidebar";
import Navbar from "./components/navbar";
import RewardsTab from "./components/rewards/rewards";
import { SidebarProvider } from "./components/ui/sidebar";

function App({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<div className="flex bg-sidebar min-h-screen w-full">
				{/* Sidebar */}
				<AppSidebar/>

				{/* Main content area */}
				<div className="flex flex-col flex-1">
					{/* Top navigation bar */}
					<Navbar />
					<main className="flex-1 px-4">
						<RewardsTab />
						{children}
					</main>
				</div>
			</div>
		</SidebarProvider>
	);
}

export default App;
