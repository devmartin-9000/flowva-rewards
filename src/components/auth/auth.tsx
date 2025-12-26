import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

type AuthMode = "login" | "signup";

export default function Auth() {
	const [mode, setMode] = useState<AuthMode>("login");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const isLogin = mode === "login";

	const handleAuth = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		if (isLogin) {
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});
			if (error) alert(error.message);
		} else {
			const { error } = await supabase.auth.signUp({
				email,
				password,
				options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
			});
			if (error) alert(error.message);
			else alert("Check your email for the confirmation link!");
		}

		setLoading(false);
	};

	const signInWithGoogle = async () => {
		await supabase.auth.signInWithOAuth({ provider: "google" });
	};

	const toggleMode = () => {
		setMode(isLogin ? "signup" : "login");
		// Optional: clear errors or password when switching
	};

	return (
		<div className="min-h-screen w-full flex items-center justify-center bg-[#8B2CFF] p-7 font-sans">
			<div className="w-full max-w-[450px] bg-white rounded-2xl shadow-2xl p-6 md:p-8 flex flex-col items-center transition-all duration-300">
				{/* Dynamic Header */}
				<h1 className="text-2xl font-bold text-[#8B2CFF] mb-2">
					{isLogin ? "Log in to flowva" : "Create your account"}
				</h1>
				<p className="text-gray-500 text-sm mb-6 text-center">
					{isLogin
						? "Log in to receive personalized recommendations"
						: "Join flowva to start earning rewards and tracking progress"}
				</p>

				<form onSubmit={handleAuth} className="w-full space-y-5">
					{/* Email Field */}
					<div className="space-y-1.5">
						<label className="text-sm font-semibold text-gray-700 ml-1">
							Email
						</label>
						<Input
							type="email"
							placeholder="user@example.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="h-12 border-gray-200 focus-visible:ring-[#8B2CFF]"
							required
						/>
					</div>

					{/* Password Field */}
					<div className="space-y-1.5">
						<label className="text-sm font-semibold text-gray-700 ml-1">
							Password
						</label>
						<div className="relative">
							<Input
								type={showPassword ? "text" : "password"}
								placeholder="••••••••"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="h-12 border-gray-200 focus-visible:ring-[#8B2CFF] pr-16"
								required
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-blue-600 hover:text-blue-800"
							>
								{showPassword ? "Hide" : "Show"}
							</button>
						</div>

						{/* Contextual Password Links/Hints */}
						<div className="flex justify-between items-center px-1">
							{!isLogin && (
								<p className="text-[10px] text-gray-400">Min. 6 characters</p>
							)}
							{isLogin && (
								<button
									type="button"
									className="text-xs font-semibold text-[#8B2CFF] hover:underline ml-auto"
								>
									Forgot Password?
								</button>
							)}
						</div>
					</div>

					{/* Main Action Button */}
					<Button
						type="submit"
						disabled={loading}
						className="w-full h-12 bg-[#8B2CFF] hover:bg-[#7a23e6] text-white rounded-full font-bold text-lg transition-all mt-2"
					>
						{loading
							? isLogin
								? "Signing in..."
								: "Creating account..."
							: isLogin
							? "Sign in"
							: "Get Started"}
					</Button>
				</form>

				{/* Divider */}
				<div className="w-full flex items-center my-6">
					<Separator className="flex-1" />
					<span className="px-3 text-xs text-gray-400 font-medium">or</span>
					<Separator className="flex-1" />
				</div>

				{/* Google Button */}
				<Button
					variant="outline"
					type="button"
					onClick={signInWithGoogle}
					className="w-full h-12 border-gray-200 rounded-md font-medium text-gray-700 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
				>
					<img
						src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
						alt="Google"
						className="w-5 h-5"
					/>
					{isLogin ? "Sign in with Google" : "Sign up with Google"}
				</Button>

				{/* Switcher Footer */}
				<p className="mt-8 text-sm text-gray-600">
					{isLogin ? "Don't have an account? " : "Already have an account? "}
					<button
						onClick={toggleMode}
						className="text-[#8B2CFF] font-bold hover:underline focus:outline-none"
					>
						{isLogin ? "Sign up" : "Log in"}
					</button>
				</p>
			</div>
		</div>
	);
}
