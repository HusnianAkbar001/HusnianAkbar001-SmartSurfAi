"""Communicate with web browsers through drivers."""

# %% IMPORTS

import typing as T

import selenium.webdriver as wd
from selenium.webdriver.common import alert, by
from selenium.webdriver.support import select

from smartsurf import types

# %% CLASSES


class DriverConfig(types.ImmutableData):
    """Config for the driver."""

    model_config = {"extra": "allow"}

    name: T.Literal["Chrome", "Firefox"] = types.Field(
        default="Chrome", description="Name of the driver to use"
    )
    keep_alive: bool = types.Field(
        default=True, description="Keep the browser open at the end of the execution"
    )
    maximize_window: bool = types.Field(
        default=True, description="Maximize the browser window at the start of the execution"
    )
    headless: bool = types.Field(
        default=False, description="Run the browser in headless mode"
    )


# %% ALIASES

CSS = by.By.CSS_SELECTOR
Alert: T.TypeAlias = alert.Alert
Select: T.TypeAlias = select.Select
Driver: T.TypeAlias = wd.Chrome | wd.Firefox

# %% FUNCTIONS


def init_driver_from_config(config: DriverConfig) -> Driver:
    """Initialize the driver from config."""
    driver: Driver  # not assiged!
    if config.name == "Chrome":
        options = wd.ChromeOptions()
        if config.headless:
            options.add_argument('--headless')
        driver = wd.Chrome(
            options=options,
            service=wd.ChromeService(),
            keep_alive=config.keep_alive,
        )
    elif config.name == "Firefox":
        options = wd.FirefoxOptions()
        if config.headless:
            options.add_argument('--headless')
        driver = wd.Firefox(
            options=options,
            service=wd.FirefoxService(),
            keep_alive=config.keep_alive,
        )
    else:
        raise ValueError(
            f"Cannot initialize driver from config (unknown driver name): {config.name}!"
        )
    if config.maximize_window is True:
        driver.maximize_window()
    return driver
