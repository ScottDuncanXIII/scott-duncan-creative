import "./page.transition.css";

export default function PageTransition() {
  const tileCount = 100;

  return (
    <>
      <div className="page-transition">
        {(() => {
          const tileArray = [];
          for (let i = 0; i < tileCount; i++) {
            tileArray.push(
              <div className={"page-transition__tile"} key={i}></div>
            );
          }
          return tileArray;
        })()}
      </div>
    </>
  );
}
