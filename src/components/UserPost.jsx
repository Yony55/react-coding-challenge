import { useEffect, useState } from "react"
import SkeletonPost from "./SkeletonPost.jsx";

function UserPost({ catFact }) {
    const [randPerson, setRandPerson] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetch('https://randomuser.me/api')
        .then((res) => {
          if (!res.ok) {
            throw new Error('Sorry for the inconvenience, we are currently unable to load this post.');
          }
          return res.json();
        })
        .then((data) => {
          setRandPerson(data.results[0]);
        })
        .catch((err) => {
          setError(err.message);
        });
    }, []);
  
    if (error) {
      return (
        <div className="post_card">
          <div className="text-red-500">Sorry for the inconvenience, we are currently unable to load this post.</div>
        </div>
      );
    }
  
    if (!randPerson) {
      return (
        <SkeletonPost/>
      );
    }
  
    return (
      <div className="post_card">
        <div className="flex justify-between items-start gap-5">
          <div className="flex-1 flex justify-start items-center gap-3">
            <img
              src={randPerson.picture.thumbnail}
              alt="user_picture"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />
            <div className="flex flex-col">
              <h3 className="font-semibold text-gray-900">
                {randPerson.name.first} {randPerson.name.last}
              </h3>
            </div>
          </div>
        </div>
        <p className="my-4 text-sm text_gray_700">{catFact}</p>
      </div>
    );
  }
  
  export default UserPost;
