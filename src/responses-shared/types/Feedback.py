from enum import Enum


class FeedbackStatus(Enum):
    New = 1
    WIP = 2
    AwaitingManualResponse = 3
    Done = 10
