import Image from 'next/image';
import Link from 'next/link';
import { FunctionComponent } from 'react';
import { Post } from '../../types/Post';
import ChangeTheme from '../layout/ChangeTheme';
import classes from './AllPosts.module.css';
import PostItem from './PostItem';
import useStore from '@/store'

type IProps = {
  posts: Post[] | undefined;
  // loading?: boolean;
};
// loading
const AllPosts: FunctionComponent<IProps> = ({ posts }) => {
  return (
    <>
      <div className={classes.posts}>
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
        { posts && (
          <ul className={classes.grid}>
            {posts.map((post: Post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
export default AllPosts;
