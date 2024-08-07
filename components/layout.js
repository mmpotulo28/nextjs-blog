import Head from 'next/head';
import styles from './layout.module.css';
import Image from 'next/image';
import Link from 'next/link';

const name = 'Manelisi Mpotulo';
export const siteTitle = 'Next.js Sample Website';

export default function Layout({ children, home }) {
	return (
		<div className={styles.container}>
			<Head>
				<link rel='icon' href='/favicon.ico' />
				<meta
					name='description'
					content='Learn how to build a personal website using Next.js'
				/>
				<meta
					property='og:image'
					content={`https://og-image.vercel.app/${encodeURI(
						siteTitle,
					)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
				/>
				<meta name='og:title' content={siteTitle} />
				<meta name='twitter:card' content='summary_large_image' />
			</Head>

			<header className={styles.header}>
				{home ? (
					<>
						<Image
							priority
							src='/images/profile.jpeg'
							alt=''
							width={144}
							height={144}
						/>
						<h1 className={styles.heading2X1}>{name}</h1>
					</>
				) : (
					<>
						<Link href='/'>
							<Image
								priority
								src='/images/profile.jpeg'
								alt=''
								width={108}
								height={108}
							/>
							<h2 className={styles.headingLg}>
								<Link className={styles.colorInherit} href='/'>
									{name}
								</Link>
							</h2>
						</Link>
					</>
				)}
			</header>
			<main>{children}</main>
			{!home && (
				<div className='/' style={styles.backToHome}>
					<Link href='/'> Back to home</Link>
				</div>
			)}
		</div>
	);
}
