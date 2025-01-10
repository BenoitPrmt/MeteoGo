import {RefreshControl, StyleSheet} from 'react-native';
import Animated, {
  useAnimatedRef,
  useScrollViewOffset,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';

const HEADER_HEIGHT = 250;

type Props = {
  children: any;
  refresh?: any;
  onRefresh?: () => any;
};

export default function ContainerScrollView({
                                                children, refresh, onRefresh
                                            }: Props) {
    const colorScheme = useColorScheme() ?? 'light';
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollOffset = useScrollViewOffset(scrollRef);
    const bottom = useBottomTabOverflow();

    return (
        <ThemedView style={styles.container}>
            <Animated.ScrollView
                ref={scrollRef}
                scrollEventThrottle={16}
                scrollIndicatorInsets={{ bottom }}
                contentContainerStyle={[
                    styles.contentContainer,
                    { paddingBottom: bottom + 20 } // Ajouter un padding supplémentaire pour le FAB
                ]}
                {...(refresh != null && {
                    refreshControl: (
                        <RefreshControl
                            refreshing={refresh}
                            onRefresh={onRefresh}
                        />
                    )
                })}
            >
                <ThemedView style={styles.content}>
                    {children}
                </ThemedView>
            </Animated.ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flexGrow: 1,
    },
    content: {
        flex: 1,
        padding: 20,
        gap: 16,
    },
});