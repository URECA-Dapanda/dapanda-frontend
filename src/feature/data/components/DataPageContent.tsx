import CardComponent from "@components/common/card/CardComponent";
import CardContentComponent from "@components/common/card/CardContentComponent";
import CardHeaderComponent from "@components/common/card/CardHeaderComponent";

export default function DataPageContent() {
  return (
    <div className="overflow-y-auto max-h-[100vh] space-y-10 p-4">
      <CardComponent variant="material" size={"large"}>
        <CardHeaderComponent title="Test Card"></CardHeaderComponent>
        <CardContentComponent size={"large"}>
          <button>Button</button>
        </CardContentComponent>
      </CardComponent>
      <div className="grid grid-cols-2 gap-1 w-full">
        <CardComponent
          variant="flat"
          size="medium"
          color="bg-gradient-to-r from-color-primary-300 to-color-secondary-300"
        >
          <CardHeaderComponent title="Test Card"></CardHeaderComponent>
          <CardContentComponent>
            <button>Button</button>
          </CardContentComponent>
        </CardComponent>
        <CardComponent variant="outlined" size={"small"}>
          <CardContentComponent size={"medium"}>
            <button>Button</button>
          </CardContentComponent>
        </CardComponent>
      </div>

      <CardComponent variant="material" size={"small"} color="bg-color-primary-300">
        <CardHeaderComponent title="Test Card"></CardHeaderComponent>
        <CardContentComponent size={"small"}>
          <button>Button</button>
        </CardContentComponent>
      </CardComponent>
      <CardComponent variant="material" size={"small"}>
        <CardHeaderComponent title="Test Card"></CardHeaderComponent>
        <CardContentComponent size={"medium"}>
          <button>Button</button>
        </CardContentComponent>
      </CardComponent>
    </div>
  );
}
