import React from 'react';
import { Href, Link } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';

import { authStyles } from './styles';

type AuthFooterSwitchProps = {
  prompt: string;
  linkLabel: string;
  href: Href;
  replace?: boolean;
};

export const AuthFooterSwitch: React.FC<AuthFooterSwitchProps> = ({
  prompt,
  linkLabel,
  href,
  replace = false,
}) => (
  <>
    <ThemedText>{prompt}</ThemedText>
    <Link replace={replace} href={href} style={authStyles.link}>
      {linkLabel}
    </Link>
  </>
);
