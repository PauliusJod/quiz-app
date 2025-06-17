import { View } from "react-native";
import { Alert, AlertIcon, AlertText } from "../ui/alert";
import { Badge, BadgeIcon, BadgeText } from "../ui/badge";
import { GlobeIcon, InfoIcon } from "../ui/icon";

type BadgeTypes = {
  incompleteCount: number;
  isComplete: boolean;
  isSynced: boolean;
};

export default function SurveyStateBadge({ incompleteCount, isComplete, isSynced }: BadgeTypes) {
  const notSyncedMessage = "Survey saved only on your device!";
  if (isComplete) {
    return (
      <View>
        <Badge
          size='lg'
          variant='outline'
          action='success'>
          <BadgeText>Survey completed</BadgeText>
          <BadgeIcon
            as={GlobeIcon}
            className='ml-2'
          />
        </Badge>
        {!isSynced && (
          <Alert
            className='px-2 py-1'
            action='info'
            variant='outline'>
            <AlertIcon as={InfoIcon} />
            <AlertText size='sm'>{notSyncedMessage}</AlertText>
          </Alert>
        )}
      </View>
    );
  } else {
    if (incompleteCount >= 1 && incompleteCount < 7) {
      return (
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Badge
            size='lg'
            variant='outline'
            action='warning'>
            <BadgeText>Survey in progress</BadgeText>
            <BadgeIcon
              as={GlobeIcon}
              className='ml-2'
            />
          </Badge>

          {!isSynced && (
            <Alert
              className='px-2 py-1'
              action='info'
              variant='outline'>
              <AlertIcon as={InfoIcon} />
              <AlertText size='sm'>{notSyncedMessage}</AlertText>
            </Alert>
          )}
        </View>
      );
    } else {
      return (
        <View>
          <Badge
            size='lg'
            variant='outline'
            action='error'>
            <BadgeText>Survey not started</BadgeText>
            <BadgeIcon
              as={GlobeIcon}
              className='ml-2'
            />
          </Badge>
          {!isSynced && (
            <Alert
              className='px-2 py-1'
              action='info'
              variant='outline'>
              <AlertIcon as={InfoIcon} />
              <AlertText size='sm'>{notSyncedMessage}</AlertText>
            </Alert>
          )}
        </View>
      );
    }
  }
}
