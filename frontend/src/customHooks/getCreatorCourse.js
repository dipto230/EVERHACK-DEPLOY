import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { setCreatorCourseData } from "../redux/courseSlice";

const useCreatorCourse = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const result = await axios.get(
          serverUrl + "/api/course/getcreator",
          { withCredentials: true }
        );

        dispatch(setCreatorCourseData(result.data));
      } catch (error) {
        console.log(error);
      }
    };

    if (userData) fetchCourses();
  }, [userData]);
};

export default useCreatorCourse;
