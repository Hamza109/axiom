/**
 * Trading Settings Dialog Organism
 * Complex dialog component for configuring trading parameters
 *
 * @example
 * ```tsx
 * <TradingSettingsDialog
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 * />
 * ```
 */

"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { VisuallyHidden } from "../ui/visually-hidden";

interface TradingSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Trading Settings Dialog Component
 * Allows users to configure slippage, priority, bribe, fees, MEV mode, and RPC
 */
export function TradingSettingsDialog({
  open,
  onOpenChange,
}: TradingSettingsDialogProps) {
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
  const [mevMode, setMevMode] = useState<"off" | "reduced" | "secure">("off");
  const [autoFee, setAutoFee] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className='flex flex-col w-[400px]  bg-backgroundTertiary border-[1px] border-secondaryStroke rounded-[8px] sm:rounded-[4px] shadow-[0_4px_4px_0_rgba(0,0,0,0.30),0_8px_8px_0_rgba(0,0,0,0.45)] p-0'
        showCloseButton={false}
      >
        <VisuallyHidden>
          <DialogTitle>Trading Settings</DialogTitle>
        </VisuallyHidden>

        {/* Header */}
        <div className='flex flex-row w-full h-[44px] pl-[16px] pr-[12px] justify-between items-center border-b-[1px] border-b-secondaryStroke'>
          <span className='text-textPrimary text-[14px] leading-[20px] tracking-[-0.02em] font-medium'>
            Trading Settings
          </span>
          <button
            onClick={() => onOpenChange(false)}
            className='group flex flex-row p-[4px] w-[24px] h-[24px] justify-center items-center hover:bg-secondaryStroke/20 rounded-[8px] sm:rounded-[4px] transition-colors duration-150 ease-in-out'
          >
            <i className='ri-close-line text-textSecondary text-[16px] group-hover:text-textPrimary' />
          </button>
        </div>

        {/* Tabs Section */}
        <div className='flex flex-col p-[16px] gap-[16px]'>
          <div className='border border-secondaryStroke/50 flex flex-row rounded-[8px] p-[4px]'>
            <button
              onClick={() => setActiveTab("buy")}
              className={`flex-1 h-[28px] rounded-[4px] sm:rounded-[4px] font-medium ${
                activeTab === "buy"
                  ? "bg-increase/[12%] text-increase"
                  : "bg-transparent text-textSecondary hover:bg-primaryStroke/40"
              }`}
            >
              <span className='text-[14px] font-medium'>Buy Settings</span>
            </button>
            <button
              onClick={() => setActiveTab("sell")}
              className={`flex-1 h-[28px] rounded-[4px] sm:rounded-[4px] font-medium ${
                activeTab === "sell"
                  ? "bg-decrease/[12%] text-decrease"
                  : "bg-transparent text-textSecondary hover:bg-primaryStroke/40"
              }`}
            >
              <span className='text-[14px] font-medium'>Sell Settings</span>
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className='flex flex-col flex-1 p-[16px] gap-[16px] justify-start'>
          {/* Trading Parameters */}
          <div className='flex flex-row w-full gap-[16px] justify-start items-center'>
            <div className='flex flex-row flex-1 gap-[16px] justify-start items-center'>
              {/* Slippage */}
              <div className='border border-secondaryStroke flex flex-col flex-1 h-[52px] justify-center items-center rounded-[8px] sm:rounded-[4px] group hover:border-textPrimary/10 focus-within:border-textPrimary/10 transition-colors duration-[150ms] ease-in-out cursor-text'>
                <div className='bg-secondaryStroke/50 border-b border-secondaryStroke flex flex-row w-full h-[28px]'>
                  <div className='relative flex flex-row w-full h-full items-center justify-center'>
                    <input
                      placeholder='0.0'
                      defaultValue={activeTab === "buy" ? "20" : "40"}
                      className='w-[calc(100%-20px)] px-[12px] text-textPrimary text-[14px] outline-none placeholder:text-textTertiary leading-[28px] text-center align-middle bg-transparent'
                      type='text'
                    />
                    <span className='pointer-events-none absolute right-[0px] text-textTertiary text-[14px] w-[20px]'>
                      %
                    </span>
                  </div>
                </div>
                <div className='flex flex-row w-full h-[24px] justify-center items-center'>
                  <Image
                    alt='Slippage'
                    src='/slip.svg'
                    width={12}
                    height={12}
                    loading='lazy'
                    className='text-textTertiary mr-[4px]'
                  />
                  <span className='text-textTertiary text-[12px] leading-[16px] font-normal'>
                    SLIPPAGE
                  </span>
                </div>
              </div>

              {/* Priority */}
              <div className='border border-secondaryStroke flex flex-col flex-1 h-[52px] justify-center items-center rounded-[8px] sm:rounded-[4px] group hover:border-textPrimary/10 focus-within:border-textPrimary/10 transition-colors duration-[150ms] ease-in-out cursor-text'>
                <input
                  placeholder='0.0'
                  defaultValue='0.001'
                  className='rounded-0 bg-secondaryStroke/50 border-b border-secondaryStroke flex flex-row w-full h-[28px] px-[12px] text-textPrimary text-[14px] outline-none placeholder:text-textTertiary leading-[28px] text-center'
                  type='text'
                />
                <div className='flex flex-row w-full h-[24px] justify-center items-center'>
                  <i className='ri-gas-station-line text-textTertiary text-[12px] mr-[4px]' />
                  <span className='text-textTertiary text-[12px] leading-[16px] font-normal'>
                    PRIORITY
                  </span>
                </div>
              </div>

              {/* Bribe */}
              <div className='border border-secondaryStroke flex flex-col flex-1 h-[52px] justify-center items-center rounded-[8px] sm:rounded-[4px] group hover:border-textPrimary/10 focus-within:border-textPrimary/10 transition-colors duration-[150ms] ease-in-out cursor-text'>
                <input
                  placeholder='0.0'
                  defaultValue='0.01'
                  className='rounded-0 bg-secondaryStroke/50 border-b border-secondaryStroke flex flex-row w-full h-[28px] px-[12px] text-textPrimary text-[14px] outline-none placeholder:text-textTertiary leading-[28px] text-center'
                  type='text'
                />
                <div className='flex flex-row w-full h-[24px] justify-center items-center'>
                  <i className='ri-coin-line text-textTertiary text-[12px] mr-[4px]' />
                  <span className='text-textTertiary text-[12px] leading-[16px] font-normal'>
                    BRIBE
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Fee Settings */}
          <div className='flex flex-row w-full h-[32px] gap-[16px] justify-start items-center'>
            <div className='flex flex-row w-full max-w-[100px] min-w-[100px] h-[32px] gap-[16px] justify-start items-center'>
              <span className='contents'>
                <div className='flex-1 whitespace-nowrap'>
                  <div
                    className='inline-flex flex-row h-[16px] gap-[8px] justify-start items-center cursor-pointer'
                    onClick={() => setAutoFee(!autoFee)}
                  >
                    <div className='border-[1px] border-secondaryStroke flex flex-row w-[16px] h-[16px] p-[2px] justify-center items-center rounded-[4px] cursor-pointer'>
                      {autoFee && (
                        <div className='w-[10px] h-[10px] bg-primaryBlue rounded-[1px]' />
                      )}
                    </div>
                    <span className='text-textPrimary text-[12px] font-medium text-nowrap cursor-pointer'>
                      <div className='flex items-center gap-1.5'>
                        <span>Auto Fee</span>
                      </div>
                    </span>
                  </div>
                </div>
              </span>
            </div>
            <div
              className={`relative overflow-hidden border-secondaryStroke hover:border-textPrimary/10 focus-within:border-textPrimary/10 hover:bg-primaryStroke/10 focus-within:bg-primaryStroke/10 font-normal border-[1px] flex flex-row w-full h-[32px] pl-[12px] gap-[8px] justify-start items-center rounded-full ${
                !autoFee
                  ? "opacity-[0.5] cursor-not-allowed pointer-events-none"
                  : ""
              }`}
            >
              <span className='flex-shrink-0 text-[14px] text-textTertiary font-medium'>
                MAX FEE
              </span>
              <input
                type='text'
                placeholder='0.0'
                defaultValue='0.1'
                disabled={!autoFee}
                className='flex-1 min-w-0 text-[14px] text-textPrimary placeholder:text-textTertiary font-normal outline-none bg-transparent'
              />
            </div>
          </div>

          {/* MEV Mode */}
          <div className='flex flex-row w-full justify-start items-center gap-[16px]'>
            <div className='flex flex-row w-full h-[32px] gap-[16px] max-w-[100px] min-w-[100px] justify-start items-center'>
              <span className='contents'>
                <div className='flex flex-row h-[32px] gap-[4px] justify-start items-center'>
                  <h3 className='text-textPrimary text-[12px] font-medium'>
                    MEV Mode
                  </h3>
                  <i className='ri-information-line text-textTertiary text-[14px]' />
                </div>
              </span>
            </div>
            <div className='border border-secondaryStroke/50 flex flex-row w-full gap-[1px] rounded-[8px] p-[4px]'>
              <button
                onClick={() => setMevMode("off")}
                className={`flex-1 h-[24px] rounded-[4px] sm:rounded-[4px] ${
                  mevMode === "off"
                    ? "bg-primaryBlue/15 text-primaryBlue"
                    : "bg-transparent text-textSecondary hover:bg-primaryStroke/40"
                }`}
              >
                <div className='flex flex-row justify-center items-center gap-[2px]'>
                  <i
                    className={`ri-shield-cross-line ${
                      mevMode === "off"
                        ? "text-primaryBlue"
                        : "text-textTertiary"
                    }`}
                    style={{ fontSize: "10px" }}
                  />
                  <span className='text-[12px] font-medium'>Off</span>
                </div>
              </button>
              <button
                onClick={() => setMevMode("reduced")}
                className={`flex-1 h-[24px] rounded-[4px] sm:rounded-[4px] ${
                  mevMode === "reduced"
                    ? "bg-primaryBlue/15 text-primaryBlue"
                    : "bg-transparent text-textSecondary hover:bg-primaryStroke/40"
                }`}
              >
                <div className='flex flex-row justify-center items-center gap-[2px]'>
                  <i
                    className={`ri-shield-line text-[12px] ${
                      mevMode === "reduced"
                        ? "text-primaryBlue"
                        : "text-textTertiary"
                    }`}
                  />
                  <span className='text-[12px] font-medium'>Reduced</span>
                </div>
              </button>
              <button
                onClick={() => setMevMode("secure")}
                className={`flex-1 h-[24px] rounded-[4px] sm:rounded-[4px] ${
                  mevMode === "secure"
                    ? "bg-primaryBlue/15 text-primaryBlue"
                    : "bg-transparent text-textSecondary hover:bg-primaryStroke/40"
                }`}
              >
                <div className='flex flex-row justify-center items-center gap-[2px]'>
                  <i
                    className={`ri-shield-check-line mr-[1px] ${
                      mevMode === "secure"
                        ? "text-primaryBlue"
                        : "text-textTertiary"
                    }`}
                    style={{ fontSize: "11px" }}
                  />
                  <span className='text-[12px] font-medium'>Secure</span>
                </div>
              </button>
            </div>
          </div>

          {/* RPC */}
          <div className='flex flex-row w-full gap-[16px] justify-start items-center'>
            <div className='relative overflow-hidden border-secondaryStroke hover:border-textPrimary/10 focus-within:border-textPrimary/10 hover:bg-primaryStroke/10 focus-within:bg-primaryStroke/10 font-normal border-[1px] flex flex-row w-full h-[32px] pl-[12px] gap-[8px] justify-start items-center rounded-full'>
              <span className='flex-shrink-0 text-[14px] text-textTertiary font-medium'>
                RPC
              </span>
              <input
                type='text'
                placeholder='https://a...e.com'
                className='flex-1 min-w-0 text-[14px] text-textPrimary placeholder:text-textTertiary font-normal outline-none bg-transparent'
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='border-t border-secondaryStroke/50 flex flex-row w-full h-[68px] justify-end items-center p-[16px] pb-[20px]'>
          <div className='flex flex-row flex-1 justify-end items-center'>
            <button
              onClick={() => onOpenChange(false)}
              className='flex-1 bg-primaryBlue flex flex-row h-[32px] px-[12px] gap-[8px] justify-center items-center rounded-full hover:bg-primaryBlue/80 hover:brightness-110 transition-all duration-[150ms] cursor-pointer'
            >
              <span className='text-[14px] font-bold text-background'>
                Continue
              </span>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
