"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";

export default function Dashboard() {
	return (
		<div>
			<h1>Dashboard</h1>
			<Button onClick={() => signOut()}>Sign out</Button>
		</div>
	);
}
