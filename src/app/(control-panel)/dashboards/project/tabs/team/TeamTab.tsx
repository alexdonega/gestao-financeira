import { motion } from 'motion/react';
import TeamMembersWidget from './widgets/TeamMembersWidget';

/**
 * The TeamTab component.
 */
function TeamTab() {
	const container = {
		show: {
			transition: {
				staggerChildren: 0.04
			}
		}
	};

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0 }
	};

	return (
		<motion.div
			className="flex flex-wrap py-24 px-24 md:px-32"
			variants={container}
			initial="hidden"
			animate="show"
		>
			<motion.div
				variants={item}
				className="widget flex w-full"
			>
				<TeamMembersWidget />
			</motion.div>
		</motion.div>
	);
}

export default TeamTab;
