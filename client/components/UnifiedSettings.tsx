import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Settings as SettingsIcon,
  User,
  Shield,
  Search,
  Bot,
  Link,
  Users,
  CreditCard,
  ChevronRight,
  Bell,
  Globe,
  Eye,
  Lock,
  Brain,
  FileText,
  Database,
  Zap,
  ArrowLeft,
} from "lucide-react";

interface SettingsCategory {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: {
    from: string;
    to: string;
    hover: string;
  };
}

const settingsCategories: SettingsCategory[] = [
  {
    id: "general",
    title: "General",
    description: "Account preferences, notifications, and basic settings",
    icon: User,
    color: {
      from: "from-[#99C0F0]/80",
      to: "to-[#C1D9F6]/60",
      hover: "hover:border-[#99C0F0]/60 hover:shadow-[#99C0F0]/5"
    },
  },
  {
    id: "security",
    title: "Security & Privacy",
    description: "Authentication, data protection, and audit settings",
    icon: Shield,
    color: {
      from: "from-[#C5BFEE]/80",
      to: "to-[#99C0F0]/60",
      hover: "hover:border-[#C5BFEE]/60 hover:shadow-[#C5BFEE]/5"
    },
  },
  {
    id: "discovery",
    title: "Discovery",
    description: "Search algorithms, document analysis, and classification",
    icon: Search,
    color: {
      from: "from-[#C1D9F6]/80",
      to: "to-[#C5BFEE]/60",
      hover: "hover:border-[#C1D9F6]/60 hover:shadow-[#C1D9F6]/5"
    },
  },
  {
    id: "automation",
    title: "AI & Automation",
    description: "AI assistant behavior and automated processing settings",
    icon: Bot,
    color: {
      from: "from-[#99C0F0]/80",
      to: "to-[#C5BFEE]/60",
      hover: "hover:border-[#99C0F0]/60 hover:shadow-[#99C0F0]/5"
    },
  },
  {
    id: "integration",
    title: "Integration",
    description: "External systems, exports, and third-party connections",
    icon: Link,
    color: {
      from: "from-[#C5BFEE]/80",
      to: "to-[#C1D9F6]/60",
      hover: "hover:border-[#C5BFEE]/60 hover:shadow-[#C5BFEE]/5"
    },
  },
  {
    id: "team",
    title: "Team & Collaboration",
    description: "User roles, permissions, and collaboration settings",
    icon: Users,
    color: {
      from: "from-[#C1D9F6]/80",
      to: "to-[#99C0F0]/60",
      hover: "hover:border-[#C1D9F6]/60 hover:shadow-[#C1D9F6]/5"
    },
  },
  {
    id: "billing",
    title: "Usage & Billing",
    description: "Subscription management, usage monitoring, and billing",
    icon: CreditCard,
    color: {
      from: "from-[#99C0F0]/80",
      to: "to-[#C1D9F6]/60",
      hover: "hover:border-[#99C0F0]/60 hover:shadow-[#99C0F0]/5"
    },
  }
];

interface UnifiedSettingsProps {
  selectedCategory?: string | null;
  onCategorySelect?: (categoryId: string) => void;
  onBack?: () => void;
}

export default function UnifiedSettings({ selectedCategory, onCategorySelect, onBack }: UnifiedSettingsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  
  // Settings state
  const [settings, setSettings] = useState({
    // General
    emailNotifications: true,
    desktopNotifications: false,
    language: "en",
    theme: "system",
    timezone: "America/New_York",
    
    // Security & Privacy
    twoFactorAuth: true,
    sessionTimeout: 30,
    dataRetention: 365,
    auditLogging: true,
    ssoEnabled: false,
    
    // Discovery
    defaultSearchType: "fuzzy",
    autoClassification: true,
    confidenceThreshold: 0.85,
    batchSize: 100,
    maxFileSize: 100,
    
    // Automation & AI
    aiAssistance: true,
    autoProcessing: true,
    agentIntervention: 0.7,
    reviewQueueSize: 25,
    priorityScoring: true,
    
    // Integration
    exportFormat: "pdf",
    apiRateLimit: 1000,
    webhooksEnabled: true,
    cloudStorage: "aws",
    
    // Team
    defaultUserRole: "reviewer",
    shareByDefault: false,
    collaborationMode: "real-time",
    maxTeamSize: 50,
    
    // Billing
    usageAlerts: true,
    alertThreshold: 80,
    autoRenewal: true,
    billingCycle: "monthly",
  });

  useEffect(() => {
    // Staggered animation entrance
    setTimeout(() => setIsVisible(true), 200);
  }, []);

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleCategorySelect = (category: SettingsCategory) => {
    onCategorySelect?.(category.id);
  };

  const handleBackToOverview = () => {
    onCategorySelect?.(null);
  };

  const getCategoryInfo = (cat: string) => {
    const found = settingsCategories.find(c => c.id === cat);
    return found || {
      title: "Settings",
      description: "Manage your Luceron AI preferences",
      icon: SettingsIcon,
    };
  };

  const SettingItem = ({ 
    icon: Icon, 
    title, 
    description, 
    children 
  }: { 
    icon: any, 
    title: string, 
    description: string, 
    children: React.ReactNode 
  }) => (
    <div className="flex items-start justify-between p-6 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 hover:bg-white/30 hover:border-white/30 transition-all duration-300 group">
      <div className="flex items-start space-x-4 flex-1">
        <div className="p-3 rounded-xl bg-gradient-to-br from-[#99C0F0]/30 to-[#C5BFEE]/20 border border-white/20 group-hover:shadow-lg transition-all duration-300">
          <Icon className="w-5 h-5 text-[#0E315C]/80" />
        </div>
        <div className="flex-1 space-y-2">
          <h4 className="text-base font-light text-[#0E315C]/90">{title}</h4>
          <p className="text-sm text-[#0E315C]/60 leading-relaxed">{description}</p>
        </div>
      </div>
      <div className="flex-shrink-0 ml-4">{children}</div>
    </div>
  );

  const renderGeneralSettings = () => (
    <div className="space-y-8">
      <Card className="bg-white/5 backdrop-blur-sm border-white/10 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-[#0E315C]/90 flex items-center text-lg font-light tracking-wide">
            <Bell className="w-5 h-5 mr-3" />
            Notifications
          </CardTitle>
          <CardDescription className="text-[#0E315C]/60">
            Control how you receive notifications and alerts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <SettingItem
            icon={Bell}
            title="Email Notifications"
            description="Receive updates and alerts via email"
          >
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
            />
          </SettingItem>
          <SettingItem
            icon={Bell}
            title="Desktop Notifications"
            description="Show system notifications in your browser"
          >
            <Switch
              checked={settings.desktopNotifications}
              onCheckedChange={(checked) => updateSetting('desktopNotifications', checked)}
            />
          </SettingItem>
        </CardContent>
      </Card>

      <Card className="bg-white/5 backdrop-blur-sm border-white/10 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-[#0E315C]/90 flex items-center text-lg font-light tracking-wide">
            <Globe className="w-5 h-5 mr-3" />
            Preferences
          </CardTitle>
          <CardDescription className="text-[#0E315C]/60">
            Customize your interface and locale settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <SettingItem
            icon={Globe}
            title="Language"
            description="Select your preferred language"
          >
            <Select value={settings.language} onValueChange={(value) => updateSetting('language', value)}>
              <SelectTrigger className="w-48 bg-white/10 border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white/90 backdrop-blur-xl border-white/20">
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
              </SelectContent>
            </Select>
          </SettingItem>
          <SettingItem
            icon={Eye}
            title="Theme"
            description="Choose your interface appearance"
          >
            <Select value={settings.theme} onValueChange={(value) => updateSetting('theme', value)}>
              <SelectTrigger className="w-48 bg-white/10 border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white/90 backdrop-blur-xl border-white/20">
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </SettingItem>
        </CardContent>
      </Card>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-8">
      <Card className="bg-white/5 backdrop-blur-sm border-white/10 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-[#0E315C]/90 flex items-center text-lg font-light tracking-wide">
            <Lock className="w-5 h-5 mr-3" />
            Authentication
          </CardTitle>
          <CardDescription className="text-[#0E315C]/60">
            Secure your account and control access
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <SettingItem
            icon={Shield}
            title="Two-Factor Authentication"
            description="Add an extra layer of security to your account"
          >
            <div className="flex items-center space-x-3">
              <Switch
                checked={settings.twoFactorAuth}
                onCheckedChange={(checked) => updateSetting('twoFactorAuth', checked)}
              />
              {settings.twoFactorAuth && (
                <Badge className="bg-green-500/20 text-green-700 border-green-500/30">
                  Enabled
                </Badge>
              )}
            </div>
          </SettingItem>
          <SettingItem
            icon={Lock}
            title="Session Timeout"
            description="Automatically log out after inactivity (minutes)"
          >
            <div className="w-48 space-y-3">
              <Slider
                value={[settings.sessionTimeout]}
                onValueChange={(value) => updateSetting('sessionTimeout', value[0])}
                max={120}
                min={5}
                step={5}
                className="w-full"
              />
              <div className="text-sm text-[#0E315C]/60 text-center font-light">
                {settings.sessionTimeout} minutes
              </div>
            </div>
          </SettingItem>
        </CardContent>
      </Card>

      <Card className="bg-white/5 backdrop-blur-sm border-white/10 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-[#0E315C]/90 flex items-center text-lg font-light tracking-wide">
            <Database className="w-5 h-5 mr-3" />
            Data Protection
          </CardTitle>
          <CardDescription className="text-[#0E315C]/60">
            Manage data retention and audit settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <SettingItem
            icon={FileText}
            title="Data Retention Period"
            description="How long to retain case data (days)"
          >
            <Select 
              value={settings.dataRetention.toString()} 
              onValueChange={(value) => updateSetting('dataRetention', parseInt(value))}
            >
              <SelectTrigger className="w-48 bg-white/10 border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white/90 backdrop-blur-xl border-white/20">
                <SelectItem value="90">90 Days</SelectItem>
                <SelectItem value="180">180 Days</SelectItem>
                <SelectItem value="365">1 Year</SelectItem>
                <SelectItem value="1095">3 Years</SelectItem>
                <SelectItem value="1825">5 Years</SelectItem>
              </SelectContent>
            </Select>
          </SettingItem>
          <SettingItem
            icon={Eye}
            title="Audit Logging"
            description="Track all user actions and system events"
          >
            <Switch
              checked={settings.auditLogging}
              onCheckedChange={(checked) => updateSetting('auditLogging', checked)}
            />
          </SettingItem>
        </CardContent>
      </Card>
    </div>
  );

  const renderDiscoverySettings = () => (
    <div className="space-y-8">
      <Card className="bg-white/5 backdrop-blur-sm border-white/10 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-[#0E315C]/90 flex items-center text-lg font-light tracking-wide">
            <Search className="w-5 h-5 mr-3" />
            Search & Analysis
          </CardTitle>
          <CardDescription className="text-[#0E315C]/60">
            Configure default discovery parameters and search behavior
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <SettingItem
            icon={Search}
            title="Default Search Type"
            description="Primary search algorithm for document analysis"
          >
            <Select value={settings.defaultSearchType} onValueChange={(value) => updateSetting('defaultSearchType', value)}>
              <SelectTrigger className="w-48 bg-white/10 border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white/90 backdrop-blur-xl border-white/20">
                <SelectItem value="exact">Exact Match</SelectItem>
                <SelectItem value="fuzzy">Fuzzy Search</SelectItem>
                <SelectItem value="semantic">Semantic Search</SelectItem>
                <SelectItem value="hybrid">Hybrid (Recommended)</SelectItem>
              </SelectContent>
            </Select>
          </SettingItem>
          <SettingItem
            icon={Brain}
            title="Auto-Classification"
            description="Automatically categorize documents using AI"
          >
            <Switch
              checked={settings.autoClassification}
              onCheckedChange={(checked) => updateSetting('autoClassification', checked)}
            />
          </SettingItem>
          <SettingItem
            icon={Zap}
            title="Confidence Threshold"
            description="Minimum confidence for automated decisions"
          >
            <div className="w-48 space-y-3">
              <Slider
                value={[settings.confidenceThreshold * 100]}
                onValueChange={(value) => updateSetting('confidenceThreshold', value[0] / 100)}
                max={95}
                min={50}
                step={5}
                className="w-full"
              />
              <div className="text-sm text-[#0E315C]/60 text-center font-light">
                {(settings.confidenceThreshold * 100).toFixed(0)}%
              </div>
            </div>
          </SettingItem>
        </CardContent>
      </Card>
    </div>
  );

  const renderCategoryContent = () => {
    if (!selectedCategory) return null;
    
    switch (selectedCategory) {
      case "general":
        return renderGeneralSettings();
      case "security":
        return renderSecuritySettings();
      case "discovery":
        return renderDiscoverySettings();
      case "automation":
        return (
          <div className="text-center py-12">
            <Bot className="w-16 h-16 text-[#99C0F0]/60 mx-auto mb-4" />
            <h3 className="text-xl font-light text-[#0E315C]/80 mb-2">AI & Automation Settings</h3>
            <p className="text-[#0E315C]/60">Coming soon...</p>
          </div>
        );
      case "integration":
        return (
          <div className="text-center py-12">
            <Link className="w-16 h-16 text-[#99C0F0]/60 mx-auto mb-4" />
            <h3 className="text-xl font-light text-[#0E315C]/80 mb-2">Integration Settings</h3>
            <p className="text-[#0E315C]/60">Coming soon...</p>
          </div>
        );
      case "team":
        return (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-[#99C0F0]/60 mx-auto mb-4" />
            <h3 className="text-xl font-light text-[#0E315C]/80 mb-2">Team & Collaboration Settings</h3>
            <p className="text-[#0E315C]/60">Coming soon...</p>
          </div>
        );
      case "billing":
        return (
          <div className="text-center py-12">
            <CreditCard className="w-16 h-16 text-[#99C0F0]/60 mx-auto mb-4" />
            <h3 className="text-xl font-light text-[#0E315C]/80 mb-2">Usage & Billing Settings</h3>
            <p className="text-[#0E315C]/60">Coming soon...</p>
          </div>
        );
      default:
        return renderGeneralSettings();
    }
  };

  // Show category view
  if (selectedCategory) {
    const categoryInfo = getCategoryInfo(selectedCategory);
    const IconComponent = categoryInfo.icon;

    return (
      <div className="w-full h-full">
        <div className={cn(
          "w-full h-full flex flex-col transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          {/* Header with Breadcrumb */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToOverview}
                className="p-2 hover:bg-white/10 rounded-full transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4 text-[#0E315C]/70" />
              </Button>
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#99C0F0]/20 to-[#C5BFEE]/20 backdrop-blur-sm border border-white/20 shadow-lg">
                <IconComponent className="w-8 h-8 text-[#0E315C]/80" />
              </div>
              <div>
                {/* Breadcrumb */}
                <div className="flex items-center space-x-2 mb-2">
                  <button 
                    onClick={handleBackToOverview}
                    className="text-sm font-light text-[#0E315C]/60 hover:text-[#0E315C]/80 transition-colors"
                  >
                    Settings
                  </button>
                  <span className="text-[#0E315C]/40 text-sm">/</span>
                  <span className="text-sm font-light text-[#0E315C]/80">
                    {categoryInfo.title}
                  </span>
                </div>
                <h1 className="text-3xl font-light text-[#0E315C]/90 tracking-wide">
                  {categoryInfo.title}
                </h1>
                <p className="text-[#0E315C]/60 font-light mt-1">
                  {categoryInfo.description}
                </p>
              </div>
            </div>
          </div>

          {/* Settings Content */}
          <div className="flex-1 overflow-auto">
            {renderCategoryContent()}
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-8 border-t border-white/10 mt-8">
            <Button className="bg-gradient-to-r from-[#99C0F0] to-[#C5BFEE] hover:from-[#99C0F0]/80 hover:to-[#C5BFEE]/80 text-white px-8 py-3 rounded-2xl font-light">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Show overview
  return (
    <div className="w-full h-full">
      <div className={cn(
        "w-full h-full flex flex-col transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}>
        {/* Header */}
        <div className="flex items-center mb-8">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-[#99C0F0]/20 to-[#C5BFEE]/20 backdrop-blur-sm border border-white/20 shadow-lg">
            <SettingsIcon className="w-6 h-6 text-[#0E315C]/80" />
          </div>
          <div className="ml-4">
            <h1 className="text-2xl font-light text-[#0E315C]/90 tracking-wide">Settings</h1>
            <p className="text-[#0E315C]/60 font-light">Configure your Luceron AI experience</p>
          </div>
        </div>

        {/* Settings Categories Grid */}
        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-6">
            {settingsCategories.map((category, index) => {
              const isHovered = hoveredCategory === category.id;
              const IconComponent = category.icon;
              
              return (
                <div
                  key={category.id}
                  className={cn(
                    "transition-all duration-700 ease-out",
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  )}
                  style={{
                    transitionDelay: `${400 + index * 100}ms`,
                  }}
                >
                  <button
                    onClick={() => handleCategorySelect(category)}
                    onMouseEnter={() => setHoveredCategory(category.id)}
                    onMouseLeave={() => setHoveredCategory(null)}
                    className={cn(
                      "w-full h-full bg-white/30 backdrop-blur-md border border-[#C1D9F6]/40 hover:bg-white/50 hover:shadow-xl transition-all duration-500 p-5 rounded-2xl text-left group hover:scale-[1.02] transform",
                      category.color.hover
                    )}
                  >
                    <div className="flex flex-col space-y-4 h-full">
                      {/* Icon */}
                      <div className={cn(
                        "w-12 h-12 bg-gradient-to-br rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 flex-shrink-0 shadow-lg",
                        category.color.from,
                        category.color.to
                      )}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex flex-col space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-light text-[#0E315C] group-hover:text-[#0E315C]/90 transition-colors">
                            {category.title}
                          </h3>
                          <ChevronRight className={cn(
                            "w-4 h-4 text-[#0E315C]/40 transition-all duration-300",
                            isHovered ? "text-[#0E315C]/70 translate-x-1" : ""
                          )} />
                        </div>
                        <p className="text-[#0E315C]/60 text-xs leading-relaxed font-light">
                          {category.description}
                        </p>
                      </div>

                      {/* Hover indicator */}
                      <div className={cn(
                        "h-1 bg-gradient-to-r rounded-full transition-all duration-300",
                        category.color.from,
                        category.color.to,
                        isHovered ? "opacity-60 scale-x-100" : "opacity-0 scale-x-0"
                      )} />
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
