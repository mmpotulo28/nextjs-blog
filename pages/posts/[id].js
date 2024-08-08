import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Link from 'next/link';

export default function Posts({ postData }) {
	return (
		<Layout>
			<Link href={'posts/'}>{postData.title}</Link>

			<br />
			{postData.id}
			<br />
			{postData.date}
			<br />
			<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
		</Layout>
	);
}

export async function getStaticPaths() {
	// return a list of                                                                                                 possible value for id
	const paths = getAllPostIds();
	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	// fetch necessary data for the blog post using params.id
	const postData = await getPostData(params.id);
	return {
		props: {
			postData,
		},
	};
}
