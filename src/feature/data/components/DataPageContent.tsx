import CardComponent from "@components/common/card/CardComponent";
import CardContentComponent from "@components/common/card/CardContentComponent";
import CardHeaderComponent from "@components/common/card/CardHeaderComponent";

export default function DataPageContent() {
  return (
    <div className="overflow-y-auto max-h-[100vh] space-y-10 p-4">
      <CardComponent variant="material" size={"lg"}>
        <CardHeaderComponent title="Test Card"></CardHeaderComponent>
        <CardContentComponent size={"lg"}>
          <button>Button</button>
        </CardContentComponent>
      </CardComponent>
      <div className="grid grid-cols-2 gap-1 w-full">
        <CardComponent
          variant="flat"
          size="md"
          color="bg-gradient-to-r from-color-primary-300 to-color-secondary-300"
        >
          <CardHeaderComponent title="Test Card"></CardHeaderComponent>
          <CardContentComponent>
            <button>Button</button>
          </CardContentComponent>
        </CardComponent>
        <CardComponent variant="outlined" size={"sm"} color="border-color-primary-300">
          <CardContentComponent size={"md"}>
            <button>Button</button>
          </CardContentComponent>
        </CardComponent>
      </div>

      <CardComponent variant="material" size={"sm"} color="bg-color-primary-300">
        <CardHeaderComponent title="Test Card"></CardHeaderComponent>
        <CardContentComponent size={"sm"}>
          <button>Button</button>
        </CardContentComponent>
      </CardComponent>
      <CardComponent variant="material" size={"sm"}>
        <CardHeaderComponent title="Test Card"></CardHeaderComponent>
        <CardContentComponent size={"md"}>
          <button>Button</button>
        </CardContentComponent>
      </CardComponent>
    </div>
  );
}
