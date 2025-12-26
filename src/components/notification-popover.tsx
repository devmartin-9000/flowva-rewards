// Import necessary React hooks and components
import { useState } from "react";

// Import UI components from the project's UI library
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Import FontAwesome for icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBell,
	faFire,
	faEllipsisH,
	faTrash,
	faCheck,
	faTimes,
} from "@fortawesome/free-solid-svg-icons";

// Dummy data for notifications - simulates actual notification data
// In a real application, this would likely come from an API or database
const DUMMY_NOTIFICATIONS = [
	{
		id: 1,
		title: "Daily Streak Reminder",
		time: "3d ago", // Relative time display
		description: "Don't forget to claim your streak today and start b...", // Truncated description
	},
	{
		id: 2,
		title: "Daily Streak Reminder",
		time: "4d ago",
		description: "Don't forget to claim your streak today and start b...",
	},
	{
		id: 3,
		title: "Welcome Bonus!",
		time: "5d ago",
		description: "You have received a welcome bonus for joining us!",
	},
];

// Main NotificationPopover component - the primary export of this file
export function NotificationPopover() {
	// State to manage notifications list
	// Initialized with the dummy data, but can be updated (deleted)
	const [notifications, setNotifications] = useState(DUMMY_NOTIFICATIONS);

	// Function to delete all notifications
	// Sets the notifications state to an empty array
	const deleteAll = () => setNotifications([]);

	// Function to delete a single notification by its ID
	// Filters out the notification with the matching ID
	const deleteOne = (id: number) =>
		setNotifications((prev) => prev.filter((n) => n.id !== id));

	return (
		// Popover component that contains the notification bell and dropdown content
		<Popover>
			{/* Trigger button - the notification bell icon */}
			<PopoverTrigger asChild>
				{/* 
					The notification bell button with:
					- Relative positioning for the badge
					- Hover effects
					- Responsive margin classes
				*/}
				<button className="cursor-pointer relative h-9 w-9 group flex items-center justify-center rounded-full bg-gray-100 mr-2 md:mr-6 outline-none">
					{/* Notification bell icon with hover color transition */}
					<FontAwesomeIcon
						icon={faBell}
						className="text-[#2D3748] group-hover:text-primary duration-300"
					/>
					{/* 
						Badge showing notification count (only shown if there are notifications)
						- Positioned absolutely in the top-right corner
						- Red background for visibility
					*/}
					{notifications.length > 0 && (
						<span className="absolute -top-1 -right-1 h-4 w-4 text-[10px] flex items-center justify-center rounded-full bg-red-500 text-white">
							{notifications.length}
						</span>
					)}
				</button>
			</PopoverTrigger>

			{/* Popover content that appears when the bell is clicked */}
			{/* Responsive Alignment Logic */}
			<PopoverContent
				align="center" // Center alignment of the popover
				sideOffset={12} // Distance from the trigger element
				// Responsive width and styling classes:
				// - w-80 on mobile, md:w-105 on medium+ screens
				// - mr-5 on mobile, md:mr-10 on medium+ screens for right margin
				// - p-0 removes default padding so child components control their own spacing
				// - border-none removes default border
				// - shadow-2xl adds a strong shadow for elevation effect
				// - rounded-2xl gives large rounded corners
				className="w-80 mr-5 md:w-105 md:mr-10 p-0 overflow-hidden border-none shadow-2xl rounded-2xl"
			>
				{/* Header section with gradient background */}
				<div className="bg-gradient-to-r from-[#8b2cf5] to-[#f578f3] p-4 flex justify-between items-center text-white">
					{/* Notification title */}
					<h3 className="font-bold text-lg">Notifications</h3>
					{/* Action buttons in the header */}
					<div className="flex gap-4 text-xs font-medium">
						{/* "Mark all as read" button (currently non-functional) */}
						<button className="opacity-60 hover:opacity-100 cursor-pointer">
							Mark all as read
						</button>

						{/* 
							Delete All button wrapped in DeleteDialog component
							- Uses custom DeleteDialog component for confirmation
							- Passes deleteAll function as onConfirm callback
							- Passes title text for the confirmation dialog
						*/}
						<DeleteDialog onConfirm={deleteAll} title="Delete all messages?">
							<button className="hover:underline transition-all cursor-pointer">
								Delete All
							</button>
						</DeleteDialog>
					</div>
				</div>

				{/* List container for notifications */}
				<div className="bg-white max-h-[400px] overflow-y-auto">
					{/* Conditional rendering based on whether there are notifications */}
					{notifications.length > 0 ? (
						// Map through notifications array and render each one
						notifications.map((notif, index) => (
							<NotificationItem
								key={notif.id} // Unique key for React rendering optimization
								{...notif} // Spread all notification properties
								isLast={index === notifications.length - 1} // Pass whether this is the last item
								onDelete={() => deleteOne(notif.id)} // Pass delete function for this specific notification
							/>
						))
					) : (
						// Empty state when there are no notifications
						<div className="p-8 text-center text-gray-400 text-sm">
							No new notifications
						</div>
					)}
				</div>
			</PopoverContent>
		</Popover>
	);
}

// Reusable DeleteDialog component for confirmation dialogs
// Takes children (the trigger element), onConfirm callback, and title as props
function DeleteDialog({ children, onConfirm, title }: any) {
	return (
		// AlertDialog component for modal-like confirmation
		<AlertDialog>
			{/* 
				AlertDialogTrigger wraps whatever element should open the dialog
				asChild prop allows the dialog to use the child element as the trigger
			*/}
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

			{/* Dialog content that appears when triggered */}
			<AlertDialogContent className="rounded-2xl max-w-[90%] sm:max-w-[500px] p-6">
				{/* Header section with title and close button */}
				<div className="flex justify-between items-center mb-0">
					<AlertDialogTitle className="text-xl font-bold text-slate-800">
						Confirm Deletion
					</AlertDialogTitle>
					{/* 
						Custom-styled cancel button (X icon)
						- Uses AlertDialogCancel for dialog dismissal
						- Custom styling to look like a simple X icon
					*/}
					<AlertDialogCancel className="border-none p-0 h-auto hover:bg-transparent">
						<FontAwesomeIcon icon={faTimes} className="text-gray-400 text-lg" />
					</AlertDialogCancel>
				</div>

				{/* Divider line */}
				<hr className="mb-4 border-gray-100" />

				{/* Dialog description/question */}
				<AlertDialogDescription className="text-slate-600 text-base mb-6">
					Are you sure you want to {title.toLowerCase()}
				</AlertDialogDescription>

				{/* Footer with action buttons */}
				<AlertDialogFooter className="flex-row justify-end gap-3 sm:justify-end">
					{/* "No" button - cancels the action */}
					<AlertDialogCancel className="rounded-full px-8 py-2 border-gray-200 text-slate-600 hover:bg-slate-50 mt-0 cursor-pointer">
						No
					</AlertDialogCancel>

					{/* 
						"Yes" button - confirms the action
						- Calls the onConfirm callback when clicked
						- Has a red background to indicate destructive action
					*/}
					<AlertDialogAction
						onClick={onConfirm}
						className="rounded-full px-8 py-2 bg-[#f0a1a1] hover:bg-red-400 text-white border-none cursor-pointer"
					>
						Yes
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

// Individual notification item component
// Displays a single notification with its icon, text, and actions
function NotificationItem({ title, time, description, isLast, onDelete }: any) {
	return (
		//
		// Container for a single notification item
		// - Adds bottom border unless it's the last item (controlled by isLast prop)
		// - Hover effect changes background color
		<div
			className={`flex items-start gap-3 p-4 hover:bg-slate-50 transition-colors ${
				!isLast ? "border-b border-gray-100" : ""
			}`}
		>
			{/* Icon container with orange background */}
			<div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-full bg-orange-100">
				<FontAwesomeIcon icon={faFire} className="text-orange-500 text-sm" />
			</div>

			{/* Main content area - takes remaining space */}
			<div className="flex-1 min-w-0">
				{/* Header row with title and action menu */}
				<div className="flex justify-between items-start">
					{/* Notification title - truncated if too long */}
					<h4 className="font-bold text-slate-700 text-sm leading-tight truncate">
						{title}
					</h4>

					{/* Dropdown menu for notification actions (ellipsis icon) */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							{/* Ellipsis icon trigger for dropdown menu */}
							<button className="text-gray-400 hover:text-gray-600 outline-none px-1 cursor-pointer">
								<FontAwesomeIcon icon={faEllipsisH} className="text-xs" />
							</button>
						</DropdownMenuTrigger>

						{/* Dropdown menu content */}
						<DropdownMenuContent align="end" className="w-40 rounded-xl">
							{/* "Mark as read" option (currently non-functional) */}
							<DropdownMenuItem className="cursor-pointer">
								<FontAwesomeIcon icon={faCheck} className="mr-2 h-3 w-3" />
								<span>Mark as read</span>
							</DropdownMenuItem>

							{/* 
								Delete option wrapped in DeleteDialog for confirmation
								- Custom styling with red hover state
								- e.stopPropagation() prevents event bubbling
							*/}
							<DeleteDialog onConfirm={onDelete} title="delete this message?">
								<div
									className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-red-50 text-red-600"
									onClick={(e) => e.stopPropagation()}
								>
									<FontAwesomeIcon icon={faTrash} className="mr-2 h-3 w-3" />
									<span>Delete</span>
								</div>
							</DeleteDialog>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				{/* Notification description - limited to 1 line with line-clamp */}
				<p className="text-gray-500 text-xs mt-1 line-clamp-1">{description}</p>

				{/* Time stamp - very small text for subtle display */}
				<p className="text-gray-400 text-[10px] mt-1">{time}</p>
			</div>
		</div>
	);
}
