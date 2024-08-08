import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
	// Get file names under /posts
	const fileNames = fs.readdirSync(postsDirectory);
	const allPostData = fileNames.map((fileName) => {
		const id = fileName.replace(/\.md$/, '');

		// read markdown file as string
		const fullPath = path.join(postsDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, 'utf8');

		// use gray-matter to parse the post metadata section
		const matterResult = matter(fileContents);

		// combine the data with the id
		return {
			id,
			...matterResult.data,
		};
	});

	// sort posts by date
	return allPostData.sort((a, b) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	});
}

export function getAllPostIds() {
	const fileNames = fs.readdirSync(postsDirectory);

	return fileNames.map((fileName) => {
		return {
			params: {
				id: fileName.replace(/\.md$/, ''),
			},
		};
	});
}

export async function getPostData(id) {
	const fullPath = path.join(postsDirectory, `${id}.md`);
	const fileContents = fs.readFileSync(fullPath, 'utf8');

	// use gray-matter to parse the post metadata section
	const matterResults = matter(fileContents);

	// user remark to convert markdown into HTML string
	const processedContent = await remark().use(html).process(matterResults.content);
	const contentHtml = processedContent.toString();

	return {
		id,
		contentHtml,
		...matterResults.data,
	};
}
