import Image from 'next/image';
import Link from 'next/link';
import { FunctionComponent } from 'react';
import { Post } from '../../types/Post';
import ChangeTheme from '../layout/ChangeTheme';
import classes from './AllPosts.module.css';
import PostItem from './PostItem';
import { MdOutlineAddToPhotos } from "react-icons/md";

import useStore from '@/store'

type IProps = {
  posts: Post[] | undefined;
};
// loading
const AllPosts: FunctionComponent<IProps> = ({ posts }) => {
  return (
    <>
      <div className={classes.posts}>
        <div className='flex justify-between items-center'>
          <div className={classes.postHeader}>
            <Image
              src='/images/site/profile.jpg'
              alt='profile'
              width={60}
              height={60}
            />
            <p>
              Personal blog by{' '}
              <Link href='https://github.com/MortezaFathnia'>
                Morteza Fathnia
              </Link>
              . I&nbsp;explain with words and code.
            </p>
          </div>
          <Link href={'/posts/add'} >
            <button className='px-2 py-1 flex mb-[2rem] rounded items-center'>
              <MdOutlineAddToPhotos />
              <span className='inline-block ml-1'>
                Add New Post
              </span>
            </button>
          </Link>
        </div>
        <div className='mt-[2rem]'>
          {posts && (
            <ul className={classes.grid}>
              {posts.map((post: Post) => (
                <PostItem key={post.id} post={post} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};
export default AllPosts;
