import { GlassPanel } from "@/components/ui/glass-panel";

// Test component to verify all GlassPanel variations work correctly
// This will be removed after testing is complete
export default function GlassPanelTest() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F4FD] via-[#F0F8FF] to-[#E8F0FE] p-8 space-y-8">
      
      {/* Light variant tests */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[#0E315C]">Light Variant (Page Backgrounds)</h2>
        
        {/* Light - inset none, radius md (Index page style) */}
        <div className="relative h-40 bg-gray-100">
          <GlassPanel variant="light" inset="none" radius="md">
            <div className="relative z-10 p-6">
              <p className="text-[#0E315C]">Light variant, inset-0, rounded-2xl (Index page style)</p>
            </div>
          </GlassPanel>
        </div>
        
        {/* Light - inset sm, radius md (Settings page style) */}
        <div className="relative h-40 bg-gray-100">
          <GlassPanel variant="light" inset="sm" radius="md">
            <div className="relative z-10 p-6">
              <p className="text-[#0E315C]">Light variant, inset-6, rounded-2xl (Settings page style)</p>
            </div>
          </GlassPanel>
        </div>
      </div>

      {/* Heavy variant tests */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[#0E315C]">Heavy Variant (Main Panels)</h2>
        
        {/* Heavy - 3 layers, radius lg (CaseDetailsNew style) */}
        <div className="relative h-40 bg-gray-100">
          <GlassPanel variant="heavy" inset="none" radius="lg" layered={true}>
            <div className="relative z-10 p-6">
              <p className="text-[#0E315C]">Heavy variant, 3 layers, rounded-3xl (CaseDetailsNew style)</p>
            </div>
          </GlassPanel>
        </div>
        
        {/* Heavy - 3 layers, radius md (GlassSidePanel style) */}
        <div className="relative h-40 bg-gray-100">
          <GlassPanel variant="heavy" inset="none" radius="md" layered={true}>
            <div className="relative z-10 p-6">
              <p className="text-[#0E315C]">Heavy variant, 3 layers, rounded-2xl (GlassSidePanel style)</p>
            </div>
          </GlassPanel>
        </div>
        
        {/* Heavy - inset sm, 3 layers, radius lg (SettingsCategory style) */}
        <div className="relative h-40 bg-gray-100">
          <GlassPanel variant="heavy" inset="sm" radius="lg" layered={true}>
            <div className="relative z-10 p-6">
              <p className="text-[#0E315C]">Heavy variant, inset-6, 3 layers, rounded-3xl (SettingsCategory style)</p>
            </div>
          </GlassPanel>
        </div>
      </div>

      {/* Enhanced variant tests */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[#0E315C]">Enhanced Variant (High Contrast)</h2>
        
        {/* Enhanced - radius md (CommunicationsPanel style) */}
        <div className="relative h-40 bg-gray-100">
          <GlassPanel variant="enhanced" inset="none" radius="md" layered={true}>
            <div className="relative z-10 p-6">
              <p className="text-[#0E315C]">Enhanced variant, 2 layers, rounded-2xl (CommunicationsPanel style)</p>
            </div>
          </GlassPanel>
        </div>
      </div>

      {/* Test non-layered heavy variant */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[#0E315C]">Single Layer Tests</h2>
        
        <div className="relative h-40 bg-gray-100">
          <GlassPanel variant="heavy" inset="none" radius="md" layered={false}>
            <div className="relative z-10 p-6">
              <p className="text-[#0E315C]">Heavy variant, single layer only (layered=false)</p>
            </div>
          </GlassPanel>
        </div>
      </div>
      
    </div>
  );
}
