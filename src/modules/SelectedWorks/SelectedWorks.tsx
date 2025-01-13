import SelectedWorksSlider from "./components/SelectedWorksSlider";

import "./selected.works.css";

export default function SelectedWorks({ init = false }: { init: boolean }) {
  return (
    <div className={"selected-works"}>
      <SelectedWorksSlider init={init} />
    </div>
  );
}
