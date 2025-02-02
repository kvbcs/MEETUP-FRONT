"use client";
import React, { useEffect, useState } from "react";
import DropMenu from "../ShadCN/DropMenu";
import Link from "next/link";
import { FaArrowRightFromBracket, FaUserPen, FaHouse } from "react-icons/fa6";
import { FaCalendarAlt, FaSignInAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { RiAdminFill } from "react-icons/ri";
import { useStoreConnect } from "@/Components/stores/connextTest";
import { BiSolidParty } from "react-icons/bi";
import Image from "next/image";

const Header = () => {
	const { push } = useRouter();
	const { isConnected, setIsConnected } = useStoreConnect((state) => state);
	const [isLoading, setisLoading] = useState(true);
	const [isAdmin, setIsAdmin] = useState(false);

	function checkIsAdmin() {
		const jwt = window.localStorage.getItem("token");
		const role = window.localStorage.getItem("role");
		return (
			role === `${process.env.NEXT_PUBLIC_ADMIN_ROLE}` &&
			jwt !== undefined &&
			jwt!.length > 60
		);
	}

	function checkIsConnected() {
		const role = window.localStorage.getItem("role");
		const agenda = window.localStorage.getItem("agenda");
		const jwt = window.localStorage.getItem("token");
		return (
			(jwt !== null &&
				jwt.length > 62 &&
				agenda !== null &&
				agenda.length > 30 &&
				role !== null &&
				role.length > 30 &&
				role === `${process.env.NEXT_PUBLIC_ADMIN_ROLE}`) ||
			role === `${process.env.NEXT_PUBLIC_USER_ROLE}`
		);
	}

	useEffect(() => {
		setisLoading(true);
		setIsAdmin(checkIsAdmin());
		setIsConnected(checkIsConnected());
		setisLoading(false);
	}, [isLoading, isConnected]);

	const handleDisconnect = () => {
		setisLoading(true);
		window.localStorage.clear();
		push("/");
	};

	return (
		<header className="w-full flex flex-row justify-between px-8 gap-2 items-center h-[10vh] bg-gradient-to-t from-blue-700 to-blue-900">
			<div className="flex flex-row items-center gap-2 w-fit h-[90%]">
				<Image
					onClick={() => {
						push("/");
					}}
					src="/Logo.png"
					alt="The Meetup logo"
					className="w-full h-full hover:cursor-pointer rounded-full hover:scale-110 transition ease-in-out"
					width={100}
					height={100}
				/>
			</div>
			<nav className="min-w-2/3 max-w-fit lg:flex justify-end lg:gap-14">
				<ul className="text-white text-xl flex-row items-center md:gap-4 lg:gap-14 hidden lg:flex flex-nowrap justify-end ">
					<Link href="/">
						<li className="hover:bg-sky-500 font-bold hover:scale-125 transition ease-in-out flex flex-row items-center gap-3 p-2 rounded-lg">
							<FaHouse size={26} />
							Home
						</li>
					</Link>
					<Link href="/events">
						<li className="hover:bg-sky-500 font-bold hover:scale-125 transition ease-in-out flex flex-row items-center gap-2 p-2 rounded-lg">
							<BiSolidParty size={26} />
							Events
						</li>
					</Link>
					{isConnected ? (
						<ul className="text-white text-xl font-bold flex-row items-center md:gap-4 lg:gap-14 hidden md:flex">
							<Link href="/agenda">
								<li className="hover:bg-sky-500 font-bold hover:scale-125 transition ease-in-out flex flex-row items-center gap-2 p-2 rounded-lg">
									<FaCalendarAlt size={26} />
									Agenda
								</li>
							</Link>

							{isAdmin && (
								<Link href="/admin">
									<li className="hover:bg-sky-500 font-bold hover:scale-125 transition ease-in-out flex flex-row items-center gap-2 p-2 rounded-lg">
										<RiAdminFill size={26} />
										Admin
									</li>
								</Link>
							)}
						</ul>
					) : (
						<div className="flex flex-row w-fit  justify-evenly gap-8 items-center">
							<button
								onClick={() => {
									push("/login");
								}}
								className="hidden md:flex bg-white hover:bg-black border-black border-2 hover:border-white hover:text-white transition ease-in-out hover:scale-110 text-black flex-row items-center gap-2 justify-evenly w-[150px] p-3 rounded-full "
							>
								<FaSignInAlt size={26} />
								Login
							</button>
							<button
								onClick={() => {
									push("/register");
								}}
								className="hidden md:flex hover:scale-110 hover:text-white transition ease-in-out bg-gradient-to-t from-[gold] to-[#FEB537] flex-row items-center justify-evenly gap-2 w-[150px] text-black border-2 border-black hover:border-white  font-bold p-3 rounded-full"
							>
								<FaUserPen size={26} />
								Register
							</button>
						</div>
					)}
				</ul>
				{isConnected && (
					<button
						onClick={handleDisconnect}
						className="hidden lg:flex text-xl bg-gradient-to-b from-red-600 to-red-800 flex-row justify-evenly items-center hover:scale-110 transition ease-in-out text-white hover:text-black hover:bg-black border-2 border-white hover:border-black p-3 rounded-full font-bold w-fit lg:w-[175px]"
					>
						<FaArrowRightFromBracket size={26} />
						Log out
					</button>
				)}
				<DropMenu />
			</nav>
		</header>
	);
};

export default Header;
