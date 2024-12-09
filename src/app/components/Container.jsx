import { useState } from "react";

function Container() {
    const [backgroundColor, setBackgroundColor] = useState("white");

	const handleScroll = (event) => {
		const { scrollTop, scrollHeight, clientHeight } = event.target;
		const scrollRatio = scrollTop / (scrollHeight - clientHeight);

		if (scrollRatio > 0.5) {
			setBackgroundColor("lightblue");
		} else {
			setBackgroundColor("white");
		}
        console.log(scrollRatio);
	};

	return (
		<div
			className="scrollable-section"
			style={{
				height: "300px",
				overflowY: "auto",
				border: "1px solid #ccc",
				backgroundColor: backgroundColor,
				transition: "background-color 0.5s ease",
			}}
			onScroll={handleScroll}
		>
			<p style={{ paddingTop: "200px", textAlign: "center" }}>
				Scrollable Section
			</p>
			<p style={{ paddingTop: "500px", textAlign: "center" }}>
				Keep scrolling...
			</p>
			<p style={{ paddingTop: "800px", textAlign: "center" }}>
				Background Changes on Scroll
			</p>
		</div>
	);
}

export default Container;