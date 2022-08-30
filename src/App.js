import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getList, addList } from "./store/list/listSlice";
import List from "./components/List";

function App() {
  const dispatch = useDispatch();
  const listData = useSelector((state) => state.list);
  const [listValue, setListValue] = useState("");
  useEffect(() => {
    dispatch(getList());
  }, [dispatch]);
  const onCreate = (e) => {
    e.preventDefault();
    if (listValue) {
      const newList = { content: listValue };
      dispatch(addList(newList));
      setListValue("");
    }
  };

  return (
    <div className="App">
      <form onSubmit={onCreate}>
        <h1>{listData.message}</h1>
        <div>
          {listData.data.map((ele) => (
            <List
              key={ele.id}
              id={ele.id}
              content={ele.content}
              check={ele.check}
              category={ele.category}
            />
          ))}
        </div>
        <div>
          <input
            type="text"
            onChange={(e) => setListValue(e.target.value)}
            value={listValue}
          />
          <button type="submit">목록추가</button>
        </div>
      </form>
    </div>
  );
}

export default App;
