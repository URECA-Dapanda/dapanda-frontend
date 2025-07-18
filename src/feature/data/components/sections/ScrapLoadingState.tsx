export default function ScrapLoadingState({ text = "최적의 조합을 찾는 중입니다..." }) {
    return (
      <div className="text-center mt-40 animate-pulse">
        <p className="body-md">{text}</p>
      </div>
    );
  }
  