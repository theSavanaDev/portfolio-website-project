/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const InfiniteMovingCards = ({
	items,
	direction = "left",
	speed = "fast",
	pauseOnHover = true,
	className,
}: {
	items: {
		quote: string;
		name: string;
		title: string;
	}[];
	direction?: "left" | "right";
	speed?: "fast" | "normal" | "slow";
	pauseOnHover?: boolean;
	className?: string;
}) => {
	const containerRef = React.useRef<HTMLDivElement>(null);
	const scrollerRef = React.useRef<HTMLUListElement>(null);

	useEffect(() => {
		addAnimation();
	});

	const [start, setStart] = useState(false);

	function addAnimation() {
		if (containerRef.current && scrollerRef.current) {
			const scrollerContent = Array.from(scrollerRef.current.children);

			scrollerContent.forEach((item) => {
				const duplicatedItem = item.cloneNode(true);
				if (scrollerRef.current) {
					scrollerRef.current.appendChild(duplicatedItem);
				}
			});

			getDirection();
			getSpeed();
			setStart(true);
		}
	}
	const getDirection = () => {
		if (containerRef.current) {
			if (direction === "left") {
				containerRef.current.style.setProperty("--animation-direction", "forwards");
			} else {
				containerRef.current.style.setProperty("--animation-direction", "reverse");
			}
		}
	};

	const getSpeed = () => {
		if (containerRef.current) {
			if (speed === "fast") {
				containerRef.current.style.setProperty("--animation-duration", "34s");
			} else if (speed === "normal") {
				containerRef.current.style.setProperty("--animation-duration", "55s");
			} else {
				containerRef.current.style.setProperty("--animation-duration", "89s");
			}
		}
	};

	return (
		<div
			ref={containerRef}
			className={cn(
				/* max-w-7xl to w-screen */
				"scroller relative z-20 w-screen overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
				className,
			)}
		>
			<ul
				ref={scrollerRef}
				className={cn(
					/* change gap-16 */
					"flex w-max min-w-full shrink-0 flex-nowrap gap-16 py-4",
					start && "animate-scroll",
					pauseOnHover && "hover:[animation-play-state:paused]",
				)}
			>
				{items.map((item, idx) => (
					<li
						/* change md:w-[450px] to md:w-[60vw] , px-8 py-6 to p-16, border-slate-700 to border-slate-800 */
						className="relative w-[90vw] max-w-full flex-shrink-0 rounded-2xl border border-b-0 border-slate-800 p-5 md:w-[60vw] md:p-16"
						style={{
							//   background:
							//     "linear-gradient(180deg, var(--slate-800), var(--slate-900)", //remove this one
							//   add these two
							//   you can generate the color from here https://cssgradient.io/
							background: "rgb(4,7,29)",
							backgroundColor: "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
						}}
						/* change to idx cuz we have the same name */
						key={idx}
					>
						<blockquote>
							<div
								aria-hidden="true"
								className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
							></div>
							{/* change text color, text-lg */}
							<span className="relative z-20 text-sm font-normal leading-[1.6] text-white md:text-lg">
								{item.quote}
							</span>
							<div className="relative z-20 mt-6 flex flex-row items-center">
								{/* add this div for the profile img */}
								<div className="me-3">
									<img src="/profile.svg" alt="profile" />
								</div>
								<span className="flex flex-col gap-1">
									{/* change text color, font-normal to font-bold, text-xl */}
									<span className="text-xl font-bold leading-[1.6] text-white">{item.name}</span>
									{/* change text color */}
									<span className="text-sm font-normal leading-[1.6] text-white-200">{item.title}</span>
								</span>
							</div>
						</blockquote>
					</li>
				))}
			</ul>
		</div>
	);
};
