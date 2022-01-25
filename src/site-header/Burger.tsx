import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface Props {
	children: React.ReactNode;
	openButtonInnerHtml?: string;
	openButtonClassName?: string;
	openButtonAriaLabel?: string;
	closeButtonInnerHtml?: string;
	closeButtonClassName?: string;
	closeButtonAriaLabel?: string;
}

export default function Burger({
	openButtonInnerHtml = 'Great Danes',
	closeButtonInnerHtml = 'Close',
	children,
}: Props) {
	const [isOpen, setIsOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handler = () => {
			rootRef.current?.contains(document.activeElement) || setIsOpen(false);
		};
		document.addEventListener('focusin', () => handler());
		return function cleanup() {
			document.removeEventListener('focusin', handler);
		};
	}, [isOpen]);

	return (
		<Wrapper ref={rootRef}>
			<button
				className="uppercased"
				type="button"
				aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
				aria-expanded={isOpen}
				onClick={() => {
					setIsOpen(!isOpen);
				}}
				dangerouslySetInnerHTML={{
					__html: isOpen ? closeButtonInnerHtml : openButtonInnerHtml,
				}}
			/>
			<ul
				role="list"
				onClick={({ target }) => {
					if (!(target instanceof HTMLElement)) return;
					if (target.tagName === 'A') setIsOpen(false);
				}}
			>
				{children}
			</ul>
		</Wrapper>
	);
}

const Wrapper = styled.nav`
	color: var(--danish-red);
	position: relative;

	* + * {
		margin-top: var(--s0);
	}

	button {
		color: inherit;
		background: transparent;
		border: none;
		cursor: pointer;
		font-weight: 700;
	}

	ul {
		position: absolute;
		background-color: white;
		inline-size: max-content;
		list-style: none;

		border: 1px solid var(--danish-red);
		padding: var(--s0);

		transition: visibility 0.3s ease 0s, opacity 0.3s ease 0s;
		opacity: 0;
		visibility: hidden;
	}

	button[aria-expanded='true'] + ul {
		opacity: 1;
		visibility: visible;
	}
`;
