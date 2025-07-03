export default function HomePageContent() {
  return (
    <div className="w-[375px] h-[812px] mx-auto bg-gradient-to-b from-[#fefaef] to-white overflow-hidden">
      {/* Main Content */}
      <div style={{ height: "calc(812px - 60px)" }}>
        {currentTab === "data" && (
          <DataPage
            onNavigate={handleNavigation}
            onUserProfile={handleUserProfileClick}
            onDirectPurchase={handleDirectPurchase}
            onShowSellSheet={() => {
              setSellCategory("data");
              setShowSellSheet(true);
            }}
          />
        )}

        {currentTab === "location" && (
          <LocationPage
            onNavigate={handleNavigation}
            onUserProfile={handleUserProfileClick}
            onLocationView={handleLocationView}
            onChatClick={handleChatClick}
            onShowLocationTypeSheet={() => setShowLocationTypeSheet(true)}
          />
        )}

        {currentTab === "chat" && (
          <ChatListPage
            onBack={() => setCurrentPage("home")}
            onChatSelect={() => setCurrentPage("chat")}
            onNavigate={handleNavigation}
            onUserProfile={handleUserProfileClick}
          />
        )}

        {currentTab === "profile" && (
          <ProfilePage
            onBack={() => setCurrentPage("home")}
            onNavigate={handleNavigation}
            onCashCharge={() => setCurrentPage("cash")}
            onPandaClick={() => setCurrentPage("panda")}
            onReportClick={() => setCurrentPage("report")}
          />
        )}
      </div>

      {/* Bottom Navigation */}
      <div
        className="fixed bottom-0 bg-white border-t shadow-lg"
        style={{ width: "375px" }}
      >
        <div className="grid grid-cols-4 px-2">
          <button
            className={`flex flex-col items-center py-2 ${
              currentTab === "data" ? "text-[#119c72]" : "text-gray-400"
            }`}
            onClick={() => setCurrentTab("data")}
          >
            <Wifi className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">데이터</span>
          </button>
          <button
            className={`flex flex-col items-center py-2 ${
              currentTab === "location" ? "text-[#119c72]" : "text-gray-400"
            }`}
            onClick={() => setCurrentTab("location")}
          >
            <MapPin className="w-5 h-5 mb-1" />
            <span className="text-xs">위치기반</span>
          </button>
          <button
            className={`flex flex-col items-center py-2 ${
              currentTab === "chat" ? "text-[#119c72]" : "text-gray-400"
            }`}
            onClick={() => setCurrentTab("chat")}
          >
            <MessageCircle className="w-5 h-5 mb-1" />
            <span className="text-xs">채팅</span>
          </button>
          <button
            className={`flex flex-col items-center py-2 ${
              currentTab === "profile" ? "text-[#119c72]" : "text-gray-400"
            }`}
            onClick={() => setCurrentTab("profile")}
          >
            <User className="w-5 h-5 mb-1" />
            <span className="text-xs">마이</span>
          </button>
        </div>
      </div>

      {/* Location Type Selection Sheet */}
      <AnimatePresence>
        {showLocationTypeSheet && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowLocationTypeSheet(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative bg-white rounded-3xl p-6 m-4"
              style={{ width: "327px", maxHeight: "400px" }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">등록 유형 선택</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowLocationTypeSheet(false)}
                  className="p-1"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setLocationType("hotspot");
                    setSellCategory("hotspot");
                    setShowLocationTypeSheet(false);
                    setShowSellSheet(true);
                  }}
                  className="w-full p-4 border-2 border-[#ffe8c6] rounded-lg hover:border-[#ffd964] flex items-center gap-3"
                >
                  <div className="w-12 h-12 bg-[#ffe8c6] rounded-full flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-[#119c72]" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">핫스팟 등록</div>
                    <div className="text-sm text-gray-600">
                      개인 핫스팟을 공유하세요
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setLocationType("wifi");
                    setSellCategory("wifi");
                    setShowLocationTypeSheet(false);
                    setShowSellSheet(true);
                  }}
                  className="w-full p-4 border-2 border-[#ffe8c6] rounded-lg hover:border-[#ffd964] flex items-center gap-3"
                >
                  <div className="w-12 h-12 bg-[#ffe8c6] rounded-full flex items-center justify-center">
                    <Store className="w-6 h-6 text-[#119c72]" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">와이파이 등록</div>
                    <div className="text-sm text-gray-600">
                      매장 와이파이를 등록하세요
                    </div>
                  </div>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Sheet for Selling */}
      <AnimatePresence>
        {showSellSheet && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center"
          >
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowSellSheet(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative bg-white rounded-t-3xl p-6 overflow-y-auto"
              style={{
                width: "375px",
                height: "80vh",
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">
                  {sellCategory === "data" && "데이터 판매"}
                  {sellCategory === "hotspot" && "핫스팟 등록"}
                  {sellCategory === "wifi" && "와이파이 등록"}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSellSheet(false)}
                  className="p-1"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Data Selling Form */}
                {sellCategory === "data" && (
                  <>
                    <div>
                      <Label className="text-base font-medium mb-4 block">
                        용량 선택
                      </Label>
                      <div className="text-center mb-4">
                        <div className="text-3xl font-bold text-gray-900 mb-2">
                          {sellAmount[0]}GB
                        </div>
                        <p className="text-sm text-gray-600">
                          판매할 용량을 선택해주세요
                        </p>
                      </div>
                      <Slider
                        value={sellAmount}
                        onValueChange={setSellAmount}
                        max={10}
                        min={0.1}
                        step={0.1}
                        className="w-full mb-2"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>0.1GB</span>
                        <span>10GB</span>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="price" className="text-base font-medium">
                        가격 (캐시)
                      </Label>
                      <Input
                        id="price"
                        placeholder="예: 8000"
                        type="number"
                        className="mt-2 h-12"
                      />
                    </div>
                  </>
                )}

                {/* Hotspot/WiFi Form */}
                {(sellCategory === "hotspot" || sellCategory === "wifi") && (
                  <>
                    <div>
                      <Label htmlFor="title" className="text-base font-medium">
                        제목
                      </Label>
                      <Input
                        id="title"
                        placeholder="예: 강남역 2번출구 앞"
                        className="mt-2 h-12"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="description"
                        className="text-base font-medium"
                      >
                        설명
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="위치 설명, 이용 조건 등을 입력해주세요"
                        className="mt-2"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="price" className="text-base font-medium">
                        가격 (10분당)
                      </Label>
                      <Input
                        id="price"
                        placeholder="예: 300"
                        type="number"
                        className="mt-2 h-12"
                      />
                    </div>

                    <div>
                      <Label htmlFor="hours" className="text-base font-medium">
                        이용 시간
                      </Label>
                      <Input
                        id="hours"
                        placeholder="예: 09:00-18:00"
                        className="mt-2 h-12"
                      />
                    </div>

                    {/* Photo Upload */}
                    <div>
                      <Label className="text-base font-medium mb-3 block">
                        사진 첨부
                      </Label>
                      <div className="grid grid-cols-3 gap-3">
                        <button className="aspect-square border-2 border-dashed border-[#ffe8c6] rounded-lg flex flex-col items-center justify-center hover:border-[#ffd964]">
                          <Camera className="w-6 h-6 text-[#119c72] mb-1" />
                          <span className="text-xs text-[#119c72]">
                            사진 추가
                          </span>
                        </button>
                        <div className="aspect-square bg-[#fefaef] rounded-lg"></div>
                        <div className="aspect-square bg-[#fefaef] rounded-lg"></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        최대 5장까지 업로드 가능
                      </p>
                    </div>
                  </>
                )}

                <Button className="w-full h-12 text-base font-medium bg-[#119c72] hover:bg-[#0d7a5a] text-white">
                  등록하기
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Location Detail Sheet */}
      <LocationDetailSheet
        isOpen={showLocationDetailSheet}
        onClose={() => setShowLocationDetailSheet(false)}
        location={selectedLocation}
      />
    </div>
  );
}
