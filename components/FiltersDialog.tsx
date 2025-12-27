"use client";

import { memo, useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { VisuallyHidden } from "./ui/visually-hidden";

interface FiltersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FiltersDialog = memo(function FiltersDialog({
  open,
  onOpenChange,
}: FiltersDialogProps) {
  const [activeTab, setActiveTab] = useState<
    "newPairs" | "finalStretch" | "migrated"
  >("newPairs");
  const [activeCategory, setActiveCategory] = useState<
    "protocols" | "audit" | "metrics" | "socials"
  >("protocols");
  const [selectedProtocols, setSelectedProtocols] = useState<Set<string>>(
    new Set([
      "pump",
      "mayhem",
      "bonk",
      "moonit",
      "jupiter",
      "meteora",
      "meteoraV2",
    ])
  );
  const [selectedQuoteTokens, setSelectedQuoteTokens] = useState<Set<string>>(
    new Set(["sol", "usdc", "usd1"])
  );
  const [searchKeywords, setSearchKeywords] = useState("");
  const [excludeKeywords, setExcludeKeywords] = useState("");

  const getProtocolClasses = (color: string, isSelected: boolean) => {
    // Map color names to actual Tailwind classes using the new color variables
    const colorMap: Record<string, string> = {
      pump: "border-pump/35 group-hover:border-pump/45 bg-pump/5 group-hover:bg-pump/10 text-pump/90 group-hover:text-pump/100",
      mayhem:
        "border-mayhem/65 group-hover:border-mayhem/75 bg-mayhem/5 group-hover:bg-mayhem/10 text-mayhem",
      bonk: "border-bonk/90 group-hover:border-bonk/100 bg-bonk/5 group-hover:bg-bonk/10 text-bonk",
      bags: "border-bags/90 group-hover:border-bags/100 bg-bags/5 group-hover:bg-bags/10 text-bags",
      moonshotApp:
        "border-moonshot/65 group-hover:border-moonshot/75 bg-moonshot/5 group-hover:bg-moonshot/10 text-moonshot",
      moonshot:
        "border-moonshot/65 group-hover:border-moonshot/75 bg-moonshot/5 group-hover:bg-moonshot/10 text-moonshot",
      heaven:
        "border-heaven/90 group-hover:border-heaven/100 bg-heaven/5 group-hover:bg-heaven/10 text-heaven",
      daosFun:
        "border-daosFun/35 group-hover:border-daosFun/45 bg-daosFun/5 group-hover:bg-daosFun/10 text-daosFun/90 group-hover:text-daosFun/10",
      candle:
        "border-candle/35 group-hover:border-candle/45 bg-candle/5 group-hover:bg-candle/10 text-candle/90 group-hover:text-candle/10",
      sugar:
        "border-sugar/35 group-hover:border-sugar/45 bg-sugar/5 group-hover:bg-sugar/10 text-sugar/90 group-hover:text-sugar/10",
      launchACoin:
        "border-believe/90 group-hover:border-believe/100 bg-believe/5 group-hover:bg-believe/10 text-believe",
      jupiterStudio:
        "border-jupiterStudio/90 group-hover:border-jupiterStudio/100 bg-jupiterStudio/5 group-hover:bg-jupiterStudio/10 text-jupiterStudio",
      moonit:
        "border-moonit/90 group-hover:border-moonit/100 bg-moonit/5 group-hover:bg-moonit/10 text-moonit",
      boop: "border-boop/90 group-hover:border-boop/100 bg-boop/5 group-hover:bg-boop/10 text-boop",
      launchlab:
        "border-launchlab/25 group-hover:border-launchlab/35 bg-launchlab/0 group-hover:bg-launchlab/10 text-launchlab/65 group-hover:text-launchlab/75",
      virtualCurve:
        "border-virtualCurve/25 group-hover:border-virtualCurve/35 bg-virtualCurve/0 group-hover:bg-virtualCurve/10 text-virtualCurve/65 group-hover:text-virtualCurve/75",
      orca: "border-orca/35 group-hover:border-orca/45 bg-orca/5 group-hover:bg-orca/10 text-orca/90 group-hover:text-orca/100",
    };
    const baseClasses =
      colorMap[color] || "border-secondaryStroke/20 bg-secondaryStroke/10";

    if (!isSelected) {
      // Apply reduced opacity to unselected badges while keeping the same colors
      return `${baseClasses} opacity-[0.65]`;
    }

    return baseClasses;
  };

  const protocols = [
    { id: "pump", name: "Pump", icon: "/pump.svg", color: "pump" },
    {
      id: "mayhem",
      name: "Mayhem",
      icon: "/mayhem.svg",
      color: "mayhem",
    },
    { id: "bonk", name: "Bonk", icon: "/bonk.svg", color: "bonk" },
    { id: "bags", name: "Bags", icon: "/bags.svg", color: "bags" },
    {
      id: "moonshot",
      name: "Moonshot",
      icon: "/moonshot-new.svg",
      color: "moonshotApp",
    },
    {
      id: "heaven",
      name: "Heaven",
      icon: "/heaven.svg",
      color: "heaven",
    },
    {
      id: "daosfun",
      name: "Daos.fun",
      icon: "/daosfun.svg",
      color: "daosFun",
    },
    {
      id: "candle",
      name: "Candle",
      icon: "/candle.svg",
      color: "candle",
    },
    { id: "sugar", name: "Sugar", icon: "/sugar.svg", color: "sugar" },
    {
      id: "believe",
      name: "Believe",
      icon: "/launch-a-coin.svg",
      color: "launchACoin",
    },
    {
      id: "jupiter",
      name: "Jupiter Studio",
      icon: "/jupstudio.svg",
      color: "jupiterStudio",
    },
    {
      id: "moonit",
      name: "Moonit",
      icon: "/moonit.svg",
      color: "moonit",
    },
  ];

  const quoteTokens = [
    {
      id: "sol",
      name: "SOL",
      icon: "/sol.svg",
      color: "primaryGreen",
    },
    { id: "usdc", name: "USDC", icon: "/usdc.svg", color: "usdc" },
    { id: "usd1", name: "USD1", icon: "/usd1.svg", color: "usd1" },
  ];

  const toggleProtocol = (id: string) => {
    setSelectedProtocols((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleQuoteToken = (id: string) => {
    setSelectedQuoteTokens((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectAllProtocols = () => {
    setSelectedProtocols(new Set(protocols.map((p) => p.id)));
  };

  const unselectAllQuoteTokens = () => {
    setSelectedQuoteTokens(new Set());
  };

  const tabCounts = {
    newPairs: 2,
    finalStretch: 3,
    migrated: 3,
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className='flex flex-col w-full border border-secondaryStroke rounded-[4px] shadow-[0_4px_4px_0_rgba(0,0,0,0.30),0_8px_8px_0_rgba(0,0,0,0.45)] p-0 max-w-none max-h-[90vh] m-4 bg-backgroundTertiary'
        showCloseButton={true}
      >
        {/* DialogTitle for accessibility - visually hidden since we have a visible title */}
        <VisuallyHidden>
          <DialogTitle>Filters</DialogTitle>
        </VisuallyHidden>
        <div className='flex flex-col w-full h-[calc(100%-68px)] overflow-hidden'>
          {/* Header */}
          <div className='flex flex-row w-full min-h-[44px] h-[44px] pl-[16px] pr-[12px] justify-between items-center border-b border-secondaryStroke/0'>
            <span className='text-textPrimary text-[14px] leading-[20px] tracking-[-0.02em] font-medium'>
              Filters
            </span>
            <button
              type='button'
              onClick={() => onOpenChange(false)}
              className='group flex flex-row p-[4px] w-[24px] h-[24px] justify-center items-center hover:bg-secondaryStroke/20 rounded-[4px] transition-colors duration-150 ease-in-out'
            >
              <i className='ri-close-line text-textSecondary text-[16px] group-hover:text-textPrimary' />
            </button>
          </div>

          {/* Tabs */}
          <div className='flex flex-row flex-1 pl-[8px] pr-[12px] min-h-[36px] max-h-[36px] border-b border-secondaryStroke justify-between items-center'>
            <div className='flex flex-row gap-[16px] justify-start items-center'>
              <button
                onClick={() => setActiveTab("newPairs")}
                className={`group relative text-nowrap flex flex-row px-[8px] gap-[4px] justify-start items-center transition-colors rounded-[4px] h-[28px] ${
                  activeTab === "newPairs" ? "" : "hover:bg-primaryStroke/40"
                }`}
              >
                {activeTab === "newPairs" && (
                  <div className='border-textPrimary border-b-[2px] pt-[2px] flex flex-row flex-1 h-[36px] gap-[4px] justify-start items-center'>
                    <span className='text-textPrimary text-[14px] font-medium'>
                      New Pairs
                    </span>
                    <div className='min-w-[16px] h-[16px] px-[4px] bg-primaryBlue rounded-full flex flex-row justify-center items-center'>
                      <span className='text-[11px] text-background font-bold'>
                        {tabCounts.newPairs}
                      </span>
                    </div>
                  </div>
                )}
                {activeTab !== "newPairs" && (
                  <>
                    <div className='absolute inset-0 rounded-[4px] z-[1] pointer-events-none transition-opacity duration-150 opacity-0 group-hover:opacity-100 overflow-hidden'>
                      <div className='absolute top-[0px] -bottom-[1px] -right-[1px] -left-[1px] rounded-[4px] pointer-events-none border-textTertiary/[0.05] border-[1px]' />
                      <div className='absolute -top-[1px] bottom-[0px] -right-[1px] -left-[1px] rounded-[4px] pointer-events-none border-black/[0.05] border-[1px]' />
                    </div>
                    <div className='flex flex-row flex-1 h-[36px] gap-[4px] justify-start items-center'>
                      <span className='text-textSecondary text-[14px] font-medium'>
                        New Pairs
                      </span>
                      <div className='min-w-[16px] h-[16px] px-[4px] bg-primaryBlue rounded-full flex flex-row justify-center items-center'>
                        <span className='text-[11px] text-background font-bold'>
                          {tabCounts.newPairs}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </button>
              <button
                onClick={() => setActiveTab("finalStretch")}
                className={`group relative text-nowrap flex flex-row px-[8px] gap-[4px] justify-start items-center transition-colors rounded-[4px] h-[28px] ${
                  activeTab === "finalStretch"
                    ? ""
                    : "hover:bg-primaryStroke/40"
                }`}
              >
                {activeTab === "finalStretch" && (
                  <div className='border-textPrimary border-b-[2px] pt-[2px] flex flex-row flex-1 h-[36px] gap-[4px] justify-start items-center'>
                    <span className='text-textPrimary text-[14px] font-medium'>
                      Final Stretch
                    </span>
                    <div className='min-w-[16px] h-[16px] px-[4px] bg-primaryBlue rounded-full flex flex-row justify-center items-center'>
                      <span className='text-[11px] text-background font-bold'>
                        {tabCounts.finalStretch}
                      </span>
                    </div>
                  </div>
                )}
                {activeTab !== "finalStretch" && (
                  <>
                    <div className='absolute inset-0 rounded-[4px] z-[1] pointer-events-none transition-opacity duration-150 opacity-0 group-hover:opacity-100 overflow-hidden'>
                      <div className='absolute top-[0px] -bottom-[1px] -right-[1px] -left-[1px] rounded-[4px] pointer-events-none border-textTertiary/[0.05] border-[1px]' />
                      <div className='absolute -top-[1px] bottom-[0px] -right-[1px] -left-[1px] rounded-[4px] pointer-events-none border-black/[0.05] border-[1px]' />
                    </div>
                    <div className='flex flex-row flex-1 h-[36px] gap-[4px] justify-start items-center'>
                      <span className='text-textSecondary text-[14px] font-medium'>
                        Final Stretch
                      </span>
                      <div className='min-w-[16px] h-[16px] px-[4px] bg-primaryBlue rounded-full flex flex-row justify-center items-center'>
                        <span className='text-[11px] text-background font-bold'>
                          {tabCounts.finalStretch}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </button>
              <button
                onClick={() => setActiveTab("migrated")}
                className={`group relative text-nowrap flex flex-row px-[8px] gap-[4px] justify-start items-center transition-colors rounded-[4px] h-[28px] ${
                  activeTab === "migrated" ? "" : "hover:bg-primaryStroke/40"
                }`}
              >
                {activeTab === "migrated" && (
                  <div className='border-textPrimary border-b-[2px] pt-[2px] flex flex-row flex-1 h-[36px] gap-[4px] justify-start items-center'>
                    <span className='text-textPrimary text-[14px] font-medium'>
                      Migrated
                    </span>
                    <div className='min-w-[16px] h-[16px] px-[4px] bg-primaryBlue rounded-full flex flex-row justify-center items-center'>
                      <span className='text-[11px] text-background font-bold'>
                        {tabCounts.migrated}
                      </span>
                    </div>
                  </div>
                )}
                {activeTab !== "migrated" && (
                  <>
                    <div className='absolute inset-0 rounded-[4px] z-[1] pointer-events-none transition-opacity duration-150 opacity-0 group-hover:opacity-100 overflow-hidden'>
                      <div className='absolute top-[0px] -bottom-[1px] -right-[1px] -left-[1px] rounded-[4px] pointer-events-none border-textTertiary/[0.05] border-[1px]' />
                      <div className='absolute -top-[1px] bottom-[0px] -right-[1px] -left-[1px] rounded-[4px] pointer-events-none border-black/[0.05] border-[1px]' />
                    </div>
                    <div className='flex flex-row flex-1 h-[36px] gap-[4px] justify-start items-center'>
                      <span className='text-textSecondary text-[14px] font-medium'>
                        Migrated
                      </span>
                      <div className='min-w-[16px] h-[16px] px-[4px] bg-primaryBlue rounded-full flex flex-row justify-center items-center'>
                        <span className='text-[11px] text-background font-bold'>
                          {tabCounts.migrated}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </button>
            </div>
            <div className='hidden sm:flex flex-row gap-[16px] justify-end items-center'>
              <button className='group flex flex-row p-[6px] h-[24px] w-[24px] gap-[4px] justify-center items-center hover:bg-primaryStroke/60 transition-all duration-150 ease-in-out cursor-pointer rounded-[4px]'>
                <i className='ri-reset-left-line text-[16px] text-textSecondary' />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className='flex flex-col h-[calc(100%-156px)] sm:h-[calc(100%-80px)]'>
            {/* Keyword Search */}
            <div className='flex flex-col gap-[16px] p-[16px] border-b border-secondaryStroke/50 h-[100px] shrink-0'>
              <div className='flex flex-row gap-[16px]'>
                <div className='flex flex-col gap-[12px] flex-1'>
                  <span className='text-textSecondary text-[12px] leading-[16px] font-normal'>
                    Search Keywords
                  </span>
                  <div className='flex flex-col w-full gap-[4px] justify-start items-start'>
                    <div className='relative flex w-full'>
                      <input
                        placeholder='keyword1, keyword2...'
                        value={searchKeywords}
                        onChange={(e) => setSearchKeywords(e.target.value)}
                        className='text-textPrimary placeholder:text-textTertiary text-[12px] leading-[16px] font-normal flex flex-row w-full h-[32px] px-[8px] pr-[8px] gap-[4px] justify-start items-center rounded-[8px] sm:rounded-[4px] outline-none transition-colors duration-150 ease-in-out bg-transparent border border-secondaryStroke hover:border-textPrimary/10 focus:border-textPrimary/10 hover:bg-secondaryStroke/10 focus:bg-secondaryStroke/10 text-left'
                        type='text'
                      />
                    </div>
                  </div>
                </div>
                <div className='flex flex-col gap-[12px] flex-1'>
                  <span className='text-textSecondary text-[12px] leading-[16px] font-normal'>
                    Exclude Keywords
                  </span>
                  <div className='flex flex-col w-full gap-[4px] justify-start items-start'>
                    <div className='relative flex w-full'>
                      <input
                        placeholder='keyword1, keyword2...'
                        value={excludeKeywords}
                        onChange={(e) => setExcludeKeywords(e.target.value)}
                        className='text-textPrimary placeholder:text-textTertiary text-[12px] leading-[16px] font-normal flex flex-row w-full h-[32px] px-[8px] pr-[8px] gap-[4px] justify-start items-center rounded-[8px] sm:rounded-[4px] outline-none transition-colors duration-150 ease-in-out bg-transparent border border-secondaryStroke hover:border-textPrimary/10 focus:border-textPrimary/10 hover:bg-secondaryStroke/10 focus:bg-secondaryStroke/10 text-left'
                        type='text'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters Content */}
            <div className='flex flex-col pt-[16px] h-[calc(100%-100px)] overflow-hidden'>
              {/* Category Tabs */}
              <div className='flex flex-row flex-1 px-[16px] min-h-[36px] max-h-[36px] justify-start items-center'>
                <div className='flex flex-row flex-1 gap-[12px] justify-start items-center'>
                  <button
                    onClick={() => setActiveCategory("protocols")}
                    className={`flex flex-row px-[12px] gap-[4px] justify-start items-center group transition-colors ease-in-out duration-150 rounded-full h-[28px] ${
                      activeCategory === "protocols"
                        ? "bg-primaryStroke"
                        : "hover:bg-primaryStroke/40"
                    }`}
                  >
                    <span
                      className={`text-[14px] font-medium whitespace-nowrap ${
                        activeCategory === "protocols"
                          ? "text-textPrimary"
                          : "text-textTertiary"
                      }`}
                    >
                      Protocols
                    </span>
                    <div className='min-w-[16px] h-[16px] px-[4px] bg-primaryBlue rounded-full flex flex-row justify-center items-center'>
                      <span className='text-[11px] text-background font-bold'>
                        {selectedProtocols.size}
                      </span>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveCategory("audit")}
                    className={`flex flex-row hover:bg-primaryStroke/40 px-[12px] gap-[4px] justify-start items-center group transition-colors ease-in-out duration-150 rounded-full h-[28px] ${
                      activeCategory === "audit" ? "bg-primaryStroke" : ""
                    }`}
                  >
                    <span
                      className={`text-[14px] font-medium whitespace-nowrap ${
                        activeCategory === "audit"
                          ? "text-textPrimary"
                          : "text-textTertiary"
                      }`}
                    >
                      Audit
                    </span>
                    <div className='min-w-[16px] h-[16px] px-[4px] bg-primaryBlue rounded-full flex flex-row justify-center items-center'>
                      <span className='text-[11px] text-background font-bold'>
                        1
                      </span>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveCategory("metrics")}
                    className={`flex flex-row hover:bg-primaryStroke/40 px-[12px] gap-[4px] justify-start items-center group transition-colors ease-in-out duration-150 rounded-full h-[28px] ${
                      activeCategory === "metrics" ? "bg-primaryStroke" : ""
                    }`}
                  >
                    <span
                      className={`text-[14px] font-medium whitespace-nowrap ${
                        activeCategory === "metrics"
                          ? "text-textPrimary"
                          : "text-textTertiary"
                      }`}
                    >
                      $ Metrics
                    </span>
                  </button>
                  <button
                    onClick={() => setActiveCategory("socials")}
                    className={`flex flex-row hover:bg-primaryStroke/40 px-[12px] gap-[4px] justify-start items-center group transition-colors ease-in-out duration-150 rounded-full h-[28px] ${
                      activeCategory === "socials" ? "bg-primaryStroke" : ""
                    }`}
                  >
                    <span
                      className={`text-[14px] font-medium whitespace-nowrap ${
                        activeCategory === "socials"
                          ? "text-textPrimary"
                          : "text-textTertiary"
                      }`}
                    >
                      Socials
                    </span>
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className='h-[calc(100%-52px)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
                <div className='flex flex-col p-[16px] pb-[16px] gap-[16px]'>
                  {activeCategory === "protocols" && (
                    <>
                      {/* Protocols Section */}
                      <div className='flex flex-col gap-[12px] w-full'>
                        <div className='flex flex-row h-[24px] min-h-[24px] justify-between items-center'>
                          <span className='text-textSecondary text-[12px] leading-[16px] font-normal'>
                            Protocols
                          </span>
                          <button
                            type='button'
                            onClick={selectAllProtocols}
                            className='group text-textPrimary flex flex-row gap-[4px] text-[12px] leading-[16px] font-medium justify-start items-center rounded-full px-[7px] h-[24px] transition-colors duration-125 ease-in-out hover:border-transparent border-[1px] bg-secondaryStroke/30 border-secondaryStroke/20 hover:bg-secondaryStroke/60'
                          >
                            <span className='text-textPrimary text-[12px] leading-[16px] font-medium'>
                              Select All
                            </span>
                          </button>
                        </div>
                        <div className='overflow-y-auto max-h-[400px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
                          <div className='grid grid-cols-3 gap-[12px]'>
                            {protocols.map((protocol) => {
                              const isSelected = selectedProtocols.has(
                                protocol.id
                              );
                              return (
                                <div
                                  key={protocol.id}
                                  className='flex flex-row gap-[8px] justify-start'
                                >
                                  <button
                                    type='button'
                                    onClick={() => toggleProtocol(protocol.id)}
                                    className='group flex flex-row gap-[4px] justify-start items-center flex-shrink-0 min-w-min max-w-none overflow-visible'
                                  >
                                    <Badge
                                      className={`relative border-[1px] flex flex-row h-[24px] ${
                                        isSelected
                                          ? "pl-[5px] pr-[7px]"
                                          : "pl-[5px] pr-[5px]"
                                      } gap-[3px] justify-start items-center rounded-full cursor-pointer transition-colors duration-125 ease-in-out ${getProtocolClasses(
                                        protocol.color,
                                        isSelected
                                      )}`}
                                    >
                                      <Image
                                        alt={protocol.name}
                                        src={protocol.icon}
                                        width={14}
                                        height={14}
                                        className='group-hover:transition-opacity group-hover:duration-125 group-hover:ease-in-out z-30'
                                        loading='eager'
                                      />
                                      <span className='text-[13px] font-medium z-30 text-nowrap group-hover:transition-colors group-hover:duration-125 group-hover:ease-in-out'>
                                        {protocol.name}
                                      </span>
                                    </Badge>
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Quote Tokens Section */}
                      <div className='flex flex-col gap-[12px] w-full'>
                        <div className='flex flex-row h-[24px] min-h-[24px] justify-between items-center'>
                          <span className='text-textSecondary text-[12px] leading-[16px] font-normal'>
                            Quote Tokens
                          </span>
                          <button
                            type='button'
                            onClick={unselectAllQuoteTokens}
                            className='group text-textPrimary flex flex-row gap-[4px] text-[12px] leading-[16px] font-medium justify-start items-center rounded-full px-[7px] h-[24px] transition-colors duration-125 ease-in-out border-secondaryStroke border-[1px] bg-secondaryStroke/60 hover:bg-secondaryStroke/90'
                          >
                            <span className='text-textPrimary text-[12px] leading-[16px] font-medium'>
                              Unselect All
                            </span>
                          </button>
                        </div>
                        <div className='grid grid-cols-3 gap-[12px]'>
                          {quoteTokens.map((token) => {
                            const isSelected = selectedQuoteTokens.has(
                              token.id
                            );
                            return (
                              <div
                                key={token.id}
                                className='flex flex-row flex-1 gap-[4px] justify-start items-center'
                              >
                                <button
                                  type='button'
                                  onClick={() => toggleQuoteToken(token.id)}
                                  className='group flex flex-row gap-[4px] justify-start items-center flex-shrink-0 min-w-min max-w-none overflow-visible'
                                >
                                  <Badge
                                    className={`flex flex-row gap-[1px] justify-center items-center h-[24px] pl-[4px] pr-[7px] rounded-full cursor-pointer border-[1px] transition-colors duration-125 ease-in-out ${
                                      isSelected
                                        ? token.id === "sol"
                                          ? "border-primaryGreen/65 bg-primaryGreen/5 text-primaryGreen/90"
                                          : token.id === "usdc"
                                          ? "border-usdc/35 group-hover:border-usdc/45 bg-usdc/5 group-hover:bg-usdc/10 text-usdc group-hover:text-usdc/100"
                                          : "border-usd1/35 group-hover:border-usd1/45 bg-usd1/5 group-hover:bg-usd1/10 text-usd1/90 group-hover:text-usd1/100"
                                        : "border-secondaryStroke/20 bg-secondaryStroke/10 text-textTertiary"
                                    }`}
                                  >
                                    <Image
                                      alt={token.name}
                                      src={token.icon}
                                      width={16}
                                      height={16}
                                      className='w-[16px] h-[16px]'
                                      loading='eager'
                                    />
                                    <span className='font-medium tracking-[-0.02em] text-[13px]'>
                                      {token.name}
                                    </span>
                                  </Badge>
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className='border-t border-secondaryStroke flex flex-row w-full  justify-between items-center p-[16px] pb-[20px] z-50 bg-backgroundTertiary'>
            <div className='flex flex-row justify-start items-center gap-[16px]'>
              <button
                type='button'
                className='bg-secondaryStroke flex flex-row h-[32px] px-[12px] gap-[8px] justify-center items-center hover:bg-secondaryStroke/65 cursor-pointer rounded-full transition-colors duration-[150ms]'
              >
                <span className='text-textPrimary text-[14px] leading-[16px] font-bold'>
                  Import
                </span>
              </button>
              <button
                type='button'
                className='bg-secondaryStroke flex flex-row h-[32px] px-[12px] gap-[8px] justify-center items-center hover:bg-secondaryStroke/65 cursor-pointer rounded-full transition-colors duration-[150ms]'
              >
                <span className='text-textPrimary text-[14px] leading-[16px] font-bold'>
                  Export
                </span>
              </button>
              <button
                type='button'
                className='bg-secondaryStroke flex flex-row h-[32px] px-[12px] gap-[8px] justify-center items-center hover:bg-secondaryStroke/65 cursor-pointer rounded-full transition-colors duration-[150ms]'
              >
                <span className='text-textPrimary text-[14px] leading-[16px] font-bold'>
                  Share
                </span>
              </button>
            </div>
            <div className='flex flex-row justify-end items-center'>
              <button
                type='button'
                onClick={() => onOpenChange(false)}
                className='bg-primaryBlue flex flex-row h-[32px] px-[12px] gap-[8px] justify-center items-center rounded-full hover:bg-primaryBlue/80 hover:brightness-110 transition-all duration-[150ms] cursor-pointer'
              >
                <span className='text-[14px] font-bold text-background'>
                  Apply All
                </span>
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
});

FiltersDialog.displayName = "FiltersDialog";

export default FiltersDialog;
