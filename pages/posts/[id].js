import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';

export default function Posts() {
	return <Layout>...</Layout>;
}

export async function getStaticPaths() {
	// return a list of possible value for id
	const paths = getAllPostIds();
	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	// fetch necessary data for the blog post using params.id
	const postData = getPostData(params.id);
	return {
		props: {
			postData,
		},
	};
}
