const Content = ({ data }) => {
  return (
    <div className="my-1">
      {data.text && <p>{data.text}</p>}

      {data.image && <img src={data.image} className="rounded-xl my-3" />}
    </div>
  );
};

export default Content;
